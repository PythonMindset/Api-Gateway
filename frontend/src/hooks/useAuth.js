import { useState } from 'react';
import { authAPI } from '../api';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authAPI.login(email, password);

            if (response.success && response.data) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                return response.data;
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    return { login, loading, error };
};

export const useRequestAccess = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const requestAccess = async (email, name, description = '') => {
        setLoading(true);
        setError(null);

        try {
            const response = await authAPI.requestAccess(email, name, description);

            if (response.success) {
                return response;
            } else {
                throw new Error(response.message || 'Access request failed');
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    return { requestAccess, loading, error };
};

export const useLogout = () => {
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };
    return { logout };
};