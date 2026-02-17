const pool = require('../../config/db');
const hashPassword = require('../../utils/auth/hashPassword');
const { generateRandomPassword } = require('../../services/passwordGenerator/accessRequest');
const sendAccessGrantedEmail = require('../../utils/email/sendAccessGranted');

const accessRequest = async (req) => {
    const { email, name, description } = req.body;

    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
        throw new Error('User already exists');
    }

    const plainPassword = generateRandomPassword();
    const hashedPassword = await hashPassword(plainPassword);

    const userResult = await pool.query(
        'INSERT INTO users (email, name, password, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
        [email, name, hashedPassword, 'viewer']
    );
    const user = userResult.rows[0];

    await pool.query(
        'INSERT INTO access_request (email, name, description) VALUES ($1, $2, $3)',
        [email, name, description]
    );

    try {
        await sendAccessGrantedEmail(email, plainPassword);
    } catch (emailError) {
        console.error('Failed to send access granted email:', emailError);
        try {
            await pool.query('DELETE FROM access_request WHERE email = $1', [email]);
            await pool.query('DELETE FROM users WHERE id = $1', [user.id]);
        } catch (rollbackError) {
            console.error('Failed to rollback user creation:', rollbackError);
        }
        throw new Error('Failed to send welcome email. Account creation cancelled.');
    }
    return user;
};

module.exports = accessRequest;