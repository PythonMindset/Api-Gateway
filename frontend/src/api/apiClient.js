import { API_BASE_URL } from '../config/api';

const getAuthToken = () => localStorage.getItem('token');

export const apiFetch = async (endpoint, options = {}) => {
    try {
        const token = getAuthToken();
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        if (!response.ok) {
            let errorMessage;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || `Error: ${response.status}`;
            } catch {
                errorMessage = `Error: ${response.status}`;
            }
            throw new Error(errorMessage);
        }

        return response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('No internet connection. Please check your network and try again.');
        }
        throw error;
    }
};

export const apiGet = (endpoint) => {
    return apiFetch(endpoint, { method: 'GET' });
};

export const apiPost = (endpoint, data) => {
    return apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const apiPut = (endpoint, data) => {
    return apiFetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const apiDelete = (endpoint) => {
    return apiFetch(endpoint, { method: 'DELETE' });
};
