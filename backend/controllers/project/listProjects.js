const pool = require('../../config/db');

const listProjects = async (req) => {
    const query = 'SELECT * FROM projects WHERE created_by = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [req.user.id]);
    return result.rows;
};

module.exports = listProjects;