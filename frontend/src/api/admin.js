import { apiFetch } from './apiClient';

const getAuthToken = () => localStorage.getItem('token');

export const adminAPI = {
    getAccessRequests: async () => {
        return await apiFetch('/admin/access-requests', { method: 'GET' });
    },

    getApiLogs: async (page = 1, limit = 50, filters = {}) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...filters,
        });

        return await apiFetch(`/admin/api-logs?${params}`, { method: 'GET' });
    },
};