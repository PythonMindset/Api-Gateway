const pool = require('../../config/db');

const createProject = async (req) => {
    const { title, description, tech_stack, repo_url, status, is_public } = req.body;
    const query = `INSERT INTO projects (title, description, tech_stack, repo_url, status, is_public, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [title, description || null, tech_stack || null, repo_url || null, status, is_public || false, req.user.id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = createProject;