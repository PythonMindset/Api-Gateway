const pool = require('../../config/db');

const getProject = async (req) => {
    const { id } = req.params;
    const query = 'SELECT * FROM projects WHERE id = $1 AND (created_by = $2 OR is_public = true)';
    const result = await pool.query(query, [id, req.user.id]);
    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }
    return result.rows[0];
};

module.exports = getProject;