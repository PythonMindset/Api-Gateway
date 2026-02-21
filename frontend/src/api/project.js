import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';

export const projectAPI = {
    getProjects: async () => {
        return await apiGet('/projects');
    },

    getProjectById: async (id) => {
        return await apiGet(`/project/${id}`);
    },

    createProject: async (projectData) => {
        return await apiPost('/projects', projectData);
    },

    updateProject: async (id, projectData) => {
        return await apiPut(`/projects/${id}`, projectData);
    },

    deleteProject: async (id) => {
        return await apiDelete(`/projects/${id}`);
    },
};