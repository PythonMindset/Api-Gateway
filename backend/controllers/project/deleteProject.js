const pool = require('../../config/db');

const deleteProject = async (req) => {
    const { id } = req.params;
    const query = 'DELETE FROM projects WHERE id = $1 AND created_by = $2 RETURNING id';
    const result = await pool.query(query, [id, req.user.id]);
    if (result.rows.length === 0) {
        throw new Error('Project not found or not authorized');
    }
    return { id: result.rows[0].id };
};

module.exports = deleteProject;