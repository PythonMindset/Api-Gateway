import { useState } from 'react';
import { userAPI } from '../api';

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const changePassword = async (currentPassword, newPassword) => {
        setLoading(true);
        setError(null);

        try {
            const response = await userAPI.changePassword(currentPassword, newPassword);

            if (response.success) {
                return response;
            } else {
                throw new Error(response.message || 'Password change failed');
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    return { changePassword, loading, error };
};

export const usePublicProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPublicProjects = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await userAPI.getPublicProjects();

            if (response.success) {
                setProjects(response.data);
                return response.data;
            } else {
                throw new Error(response.message || 'Failed to fetch public projects');
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        projects,
        loading,
        error,
        fetchPublicProjects
    };
};

export const usePublicProject = () => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPublicProject = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await userAPI.getPublicProjectById(id);

            if (response.success) {
                setProject(response.data);
                return response.data;
            } else {
                throw new Error(response.message || 'Failed to fetch project');
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        project,
        loading,
        error,
        fetchPublicProject
    };
};