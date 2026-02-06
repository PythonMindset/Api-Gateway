const pool = require('../../config/db');
const { getCleanupLogsQuery } = require('../../controllers/services/cleanup/cleanupLogsQuery');

async function cleanupOldLogs() {
    try {
        const query = getCleanupLogsQuery();
        const result = await pool.query(query);
        console.log(`Cleaned up ${result.rowCount} old log entries.`);
    } catch (error) {
        console.error('Error cleaning up old logs:', error);
    }
}

module.exports = { cleanupOldLogs };