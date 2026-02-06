function getCleanupLogsQuery() {
    const expiry = process.env.LOG_EXPIRY || '15d';
    const days = parseInt(expiry.replace('d', ''));
    return `
        DELETE FROM api_logs
        WHERE timestamp < NOW() - INTERVAL '${days} days'
    `;
}

module.exports = { getCleanupLogsQuery };