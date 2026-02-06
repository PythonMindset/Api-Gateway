const pool = require('../../config/db');
const { getInactiveViewersQuery, getDeleteUsersQuery, getUpdateAccessRequestQuery } = require('../../controllers/services/cleanup/cleanupInactiveViewersQueries');

async function cleanupInactiveViewers() {
    try {
        const selectQuery = getInactiveViewersQuery();
        const inactiveViewers = await pool.query(selectQuery);

        if (inactiveViewers.rows.length === 0) {
            console.log('No inactive viewers to clean up.');
            return;
        }

        const deleteQuery = getDeleteUsersQuery();
        const ids = inactiveViewers.rows.map(row => row.id);
        await pool.query(deleteQuery, [ids]);

        const emails = inactiveViewers.rows.map(row => row.email);
        const updateQuery = getUpdateAccessRequestQuery();
        await pool.query(updateQuery, [emails]);

        console.log(`Cleaned up ${inactiveViewers.rows.length} inactive viewers.`);
    } catch (error) {
        console.error('Error cleaning up inactive viewers:', error);
    }
}

module.exports = { cleanupInactiveViewers };