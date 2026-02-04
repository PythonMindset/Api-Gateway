const pool = require('../../config/db');

const logApiCall = async (logData) => {
    try {
        const query = `
            INSERT INTO api_logs (endpoint, method, status_code, user_id)
            VALUES ($1, $2, $3, $4)
        `;

        const values = [
            logData.endpoint,
            logData.method,
            logData.status_code,
            logData.user_id
        ];

        await pool.query(query, values);
    } catch (error) {
        console.error('Database logging error:', error);
        throw error;
    }
};

module.exports = {
    logApiCall
};