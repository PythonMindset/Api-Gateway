import { useState, useEffect } from 'react';
import { adminAPI } from '../api';

export const useAccessRequests = () => {
    const [accessRequests, setAccessRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAccessRequests = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await adminAPI.getAccessRequests();

            if (response.success) {
                setAccessRequests(response.data);
                return response.data;
            } else {
                throw new Error(response.message || 'Failed to fetch access requests');
            }
        } catch (err) {
            const errorMessage = err.message || 'Failed to fetch access requests';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccessRequests();
    }, []);

    return {
        accessRequests,
        loading,
        error,
        refetch: fetchAccessRequests
    };
};

export const useApiLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);

    const fetchApiLogs = async (page = 1, limit = 50, filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await adminAPI.getApiLogs(page, limit, filters);

            if (response.success) {
                setLogs(response.data.logs);
                setPagination(response.data.pagination);
                return response.data;
            } else {
                throw new Error(response.message || 'Failed to fetch API logs');
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        logs,
        loading,
        error,
        pagination,
        fetchApiLogs
    };
};