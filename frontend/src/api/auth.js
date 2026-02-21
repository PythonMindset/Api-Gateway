import { API_BASE_URL } from '../config/api';

export const authAPI = {
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            let errorMessage = 'Login failed';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (parseError) {
                errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            }
            throw new Error(errorMessage);
        }
        const responseData = await response.json();
        if (!responseData.success) {
            throw new Error(responseData.message || 'Login failed');
        }
        return responseData.data;
    },

    requestAccess: async (email, name, description = '') => {
        const response = await fetch(`${API_BASE_URL}/auth/access-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, description }),
        });

        if (!response.ok) {
            let errorMessage = 'Access request failed';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (parseError) {
                errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            }
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        if (!responseData.success) {
            throw new Error(responseData.message || 'Access request failed');
        }
        return responseData.data;
    },
};