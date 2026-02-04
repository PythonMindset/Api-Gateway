const pool = require('../../config/db');
const hashPassword = require('../../utils/auth/hashPassword');
const { generateRandomPassword } = require('../../services/accessRequest');
const sendAccessGrantedEmail = require('../../utils/email/sendAccessGranted');

const accessRequest = async (req) => {
    const { email } = req.body;

    // Check if user already exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
        throw new Error('User already exists');
    }

    // Generate random password
    const plainPassword = generateRandomPassword();

    // Hash the password
    const hashedPassword = await hashPassword(plainPassword);

    // Insert into users table as 'viewer'
    const userResult = await pool.query(
        'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role',
        [email, hashedPassword, 'viewer']
    );
    const user = userResult.rows[0];

    // Insert into access_request table
    await pool.query(
        'INSERT INTO access_request (email) VALUES ($1)',
        [email]
    );

    // Send email with credentials
    try {
        await sendAccessGrantedEmail(email, plainPassword);
    } catch (emailError) {
        console.error('Failed to send access granted email:', emailError);
        
        // Rollback: delete the created records
        try {
            await pool.query('DELETE FROM access_request WHERE email = $1', [email]);
            await pool.query('DELETE FROM users WHERE id = $1', [user.id]);
        } catch (rollbackError) {
            console.error('Failed to rollback user creation:', rollbackError);
        }
        
        throw new Error('Failed to send welcome email. Account creation cancelled.');
    }

    // Return user data (password not included for security)
    return user;
};

module.exports = accessRequest;