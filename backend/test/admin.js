const pool = require('../config/db');
const hashPassword = require('../utils/auth/hashPassword');

async function createAdminUser(email, password) {
    try {
        const checkQuery = 'SELECT id FROM users WHERE email = $1';
        const checkResult = await pool.query(checkQuery, [email]);
        if (checkResult.rows.length > 0) {
            console.log('User with this email already exists');
            return;
        }
        const hashedPassword = await hashPassword(password);
        const insertQuery = 'INSERT INTO users (email, password, role) VALUES ($1, $2, $3)';
        await pool.query(insertQuery, [email, hashedPassword, 'admin']);

        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await pool.end();
    }
}

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
    console.log('Usage: node admin.js <email> <password>');
    process.exit(1);
}

createAdminUser(email, password);
