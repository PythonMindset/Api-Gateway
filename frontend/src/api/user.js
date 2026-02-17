import { API_BASE_URL } from '../config/api';
const getAuthToken = () => localStorage.getItem('token');

export const userAPI = {
    changePassword: async (currentPassword, newPassword) => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/user/change-password`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Password change failed');
        }
        return response.json();
    },

    getPublicProjects: async () => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/user/public`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch public projects');
        }
        return response.json();
    },

    getPublicProjectById: async (id) => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/user/public/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch project');
        }
        return response.json();
    },
};