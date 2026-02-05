const pool = require('../config/db');
const hashPassword = require('../utils/auth/hashPassword');

async function createAdminUser(email, password) {
    try {
        // Check if email already exists
        const checkQuery = 'SELECT id FROM users WHERE email = $1';
        const checkResult = await pool.query(checkQuery, [email]);
        if (checkResult.rows.length > 0) {
            console.log('User with this email already exists');
            return;
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Insert the user
        const insertQuery = 'INSERT INTO users (email, password, role) VALUES ($1, $2, $3)';
        await pool.query(insertQuery, [email, hashedPassword, 'admin']);

        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await pool.end();
    }
}

// Get email and password from command line arguments
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
    console.log('Usage: node admin.js <email> <password>');
    process.exit(1);
}

createAdminUser(email, password);
