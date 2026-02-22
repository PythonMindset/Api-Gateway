const pool = require('../../config/db');

const getApiLogs = async (req) => {
    const { page = 1, limit = 50, user_id, endpoint, method, status_code, level, role } = req.query;

    const conditions = [];
    const values = [];
    let paramCount = 1;

    if (user_id) {
        conditions.push(`al.user_id = $${paramCount}`);
        values.push(user_id);
        paramCount++;
    }

    if (endpoint) {
        conditions.push(`al.endpoint LIKE $${paramCount}`);
        values.push(`%${endpoint}%`);
        paramCount++;
    }

    if (method) {
        conditions.push(`al.method = $${paramCount}`);
        values.push(method.toUpperCase());
        paramCount++;
    }

    if (status_code) {
        conditions.push(`al.status_code = $${paramCount}`);
        values.push(parseInt(status_code));
        paramCount++;
    }

    if (level) {
        conditions.push(`al.level = $${paramCount}`);
        values.push(level);
        paramCount++;
    }

    if (role) {
        conditions.push(`u.role = $${paramCount}`);
        values.push(role);
        paramCount++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countQuery = `SELECT COUNT(*) as total FROM api_logs al LEFT JOIN users u ON al.user_id = u.id ${whereClause}`;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].total);

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const query = `
        SELECT al.id, al.endpoint, al.method, al.status_code, al.user_id, al.level, al.timestamp, u.name as user_name, u.role
        FROM api_logs al
        LEFT JOIN users u ON al.user_id = u.id
        ${whereClause}
        ORDER BY al.timestamp DESC
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