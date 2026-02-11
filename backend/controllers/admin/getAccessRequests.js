const pool = require('../../config/db');
const { successResponse, errorResponse } = require('../../utils/responseformat');

const getAccessRequests = async (req, res) => {
    try {
        const query = `
            SELECT ar.id, ar.email, ar.name, ar.description, ar.status, ar.requested_on,
                   u.name as user_name, u.last_active, u.created_at, u.role
            FROM access_request ar
            LEFT JOIN users u ON ar.email = u.email
            ORDER BY ar.requested_on DESC
        `;
        const result = await pool.query(query);
        res.json(successResponse('Access requests retrieved successfully', result.rows));
    } catch (error) {
        console.error('Error retrieving access requests:', error);
        res.status(500).json(errorResponse('Failed to retrieve access requests', 500));
    }
};

module.exports = { getAccessRequests };