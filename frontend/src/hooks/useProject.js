import { useState } from 'react';
import { projectAPI } from '../api';

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await projectAPI.getProjects();

            if (response.success) {
                setProjects(response.data);
                return response.data;
            } else {
                throw new Error(response.message || 'Failed to fetch projects');
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
        fetchProjects
    };
};

export const useProject = () => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProject = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await projectAPI.getProjectById(id);

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
        fetchProject
    };
};

export const useCreateProject = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createProject = async (projectData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await projectAPI.createProject(projectData);

            if (response.success) {
                return response.data;
            } else {
                throw new Error(response.message || 'Failed to create project');
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    return { createProject, loading, error };
};

export const useUpdateProject = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateProject = async (id, projectData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await projectAPI.updateProject(id, projectData);

            if (response.success) {
                return response.data;
            } else {
                throw new Error(response.message || 'Failed to update project');
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateProject, loading, error };
};

export const useDeleteProject = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteProject = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await projectAPI.deleteProject(id);

            if (response.success) {
                return response;
            } else {
                throw new Error(response.message || 'Failed to delete project');
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    return { deleteProject, loading, error };
};