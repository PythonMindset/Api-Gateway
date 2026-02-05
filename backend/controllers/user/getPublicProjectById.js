const pool = require('../../config/db');

const getPublicProjectById = async (req) => {
    const { id } = req.params;
    const query = 'SELECT id, title, description, tech_stack, repo_url, status, created_at, updated_at FROM projects WHERE id = $1 AND is_public = true AND status != \'archived\'';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }
    return result.rows[0];
};

module.exports = getPublicProjectById;