const pool = require('../../config/db');

const listPublicProjects = async (req) => {
    const query = 'SELECT id, title, description, tech_stack, repo_url, status, created_at, updated_at FROM projects WHERE is_public = true AND status != \'archived\' ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
};

module.exports = listPublicProjects;