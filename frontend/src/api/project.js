import { API_BASE_URL } from '../config/api';
const getAuthToken = () => localStorage.getItem('token');

export const projectAPI = {
    getProjects: async () => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/projects`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch projects');
        }
        return response.json();
    },

    getProjectById: async (id) => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/project/${id}`, {
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

    createProject: async (projectData) => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/projects`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create project');
        }
        return response.json();
    },

    updateProject: async (id, projectData) => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update project');
        }
        return response.json();
    },

    deleteProject: async (id) => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete project');
        }
        return response.json();
    },
};