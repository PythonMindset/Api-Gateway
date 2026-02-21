import { apiGet, apiPut } from './apiClient';

export const userAPI = {
    changePassword: async (currentPassword, newPassword) => {
        return await apiPut('/user/change-password', {
            currentPassword,
            newPassword,
        });
    },

    getPublicProjects: async () => {
        return await apiGet('/user/public');
    },

    getPublicProjectById: async (id) => {
        return await apiGet(`/user/public/${id}`);
    },
};