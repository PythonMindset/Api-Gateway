const pool = require('../../config/db');

const updateProject = async (req) => {
    const { id } = req.params;
    const { title, description, tech_stack, repo_url, status, is_public } = req.body;
    const query = `UPDATE projects SET title = COALESCE($1, title), description = COALESCE($2, description), tech_stack = COALESCE($3, tech_stack), repo_url = COALESCE($4, repo_url), status = COALESCE($5, status), is_public = COALESCE($6, is_public), updated_at = CURRENT_TIMESTAMP WHERE id = $7 AND created_by = $8 RETURNING *`;
    const values = [title, description, tech_stack, repo_url, status, is_public, id, req.user.id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
        throw new Error('Project not found or not authorized');
    }
    return result.rows[0];
};

module.exports = updateProject;