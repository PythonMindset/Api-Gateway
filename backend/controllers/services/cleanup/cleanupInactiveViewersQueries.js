function getInactiveViewersQuery() {
    const maxInactivity = process.env.MAX_VIEWER_INACTIVITY_DAYS || '30d';
    const newUserInactivity = process.env.NEW_USER_INACTIVITY_DAYS || '7d';
    const maxDays = parseInt(maxInactivity.replace('d', ''));
    const newDays = parseInt(newUserInactivity.replace('d', ''));
    return `
        SELECT id, email FROM users
        WHERE role = 'viewer' AND (
            (last_active IS NULL AND created_at < NOW() - INTERVAL '${newDays} days') OR
            (last_active < NOW() - INTERVAL '${maxDays} days')
        )
    `;
}

function getDeleteUsersQuery() {
    return `
        DELETE FROM users
        WHERE id = ANY($1)
    `;
}

function getUpdateAccessRequestQuery() {
    return `
        UPDATE access_request
        SET status = 'deactivated'
        WHERE email = ANY($1)
    `;
}

module.exports = { getInactiveViewersQuery, getDeleteUsersQuery, getUpdateAccessRequestQuery };