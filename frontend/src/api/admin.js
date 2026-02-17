import { API_BASE_URL } from '../config/api';
const getAuthToken = () => localStorage.getItem('token');

export const adminAPI = {
    getAccessRequests: async () => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/admin/access-requests`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch access requests');
            }
        return response.json();
    },

    getApiLogs: async (page = 1, limit = 50, filters = {}) => {
        const token = getAuthToken();
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...filters,
        });

        const response = await fetch(`${API_BASE_URL}/admin/api-logs?${params}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch API logs');
        }

        return response.json();
    },
};