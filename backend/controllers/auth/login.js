const pool = require('../../config/db');
const comparePassword = require('../../utils/auth/comparePassword');

const login = async (req) => {
    const { email, password } = req.body;

    // Query user by email
    const userQuery = 'SELECT id, email, password, role FROM users WHERE email = $1';
    const result = await pool.query(userQuery, [email]);

    if (result.rows.length === 0) {
        throw new Error('Invalid credentials');
    }

    const user = result.rows[0];

    // Compare password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid credentials');
    }

    // Update last_active
    await pool.query('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);

    // Return user data (token will be generated in route)
    return { id: user.id, email: user.email, role: user.role };
};

module.exports = login;