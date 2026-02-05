const pool = require('../../config/db');

const getApiLogs = async (req) => {
    const { page = 1, limit = 50, user_id, endpoint, method, status_code } = req.query;

    // Build WHERE conditions
    const conditions = [];
    const values = [];
    let paramCount = 1;

    if (user_id) {
        conditions.push(`user_id = $${paramCount}`);
        values.push(user_id);
        paramCount++;
    }

    if (endpoint) {
        conditions.push(`endpoint LIKE $${paramCount}`);
        values.push(`%${endpoint}%`);
        paramCount++;
    }

    if (method) {
        conditions.push(`method = $${paramCount}`);
        values.push(method.toUpperCase());
        paramCount++;
    }

    if (status_code) {
        conditions.push(`status_code = $${paramCount}`);
        values.push(parseInt(status_code));
        paramCount++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM api_logs ${whereClause}`;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].total);

    // Get paginated results
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const query = `
        SELECT id, endpoint, method, status_code, user_id, timestamp
        FROM api_logs
        ${whereClause}
        ORDER BY timestamp DESC
        LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    values.push(parseInt(limit), offset);
    const result = await pool.query(query, values);

    return {
        logs: result.rows,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
        }
    };
};

module.exports = getApiLogs;