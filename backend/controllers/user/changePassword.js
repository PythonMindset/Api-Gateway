const pool = require('../../config/db');
const comparePassword = require('../../utils/auth/comparePassword');
const hashPassword = require('../../utils/auth/hashPassword');

const changePassword = async (req) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    const targetUserId = userId;

    if (userId !== targetUserId) {
        throw new Error('Access denied: Cannot change another user\'s password');
    }

    const userQuery = 'SELECT password FROM users WHERE id = $1';
    const result = await pool.query(userQuery, [userId]);

    if (result.rows.length === 0) {
        throw new Error('User not found');
    }

    const user = result.rows[0];

    const isValidPassword = await comparePassword(currentPassword, user.password);
    if (!isValidPassword) {
        throw new Error('Current password is incorrect');
    }

    const hashedNewPassword = await hashPassword(newPassword);

    const updateQuery = 'UPDATE users SET password = $1 WHERE id = $2';
    await pool.query(updateQuery, [hashedNewPassword, userId]);

    return { message: 'Password changed successfully' };
};

module.exports = changePassword;