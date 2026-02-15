const titles = {
    default: 'Project Manager',
    login: 'Login - Project Manager',
    dashboard: 'Dashboard - Project Manager',
    request: 'Request Access - Project Manager'
};

export const getPageTitle = (page) => {
    return titles[page] || titles.default;
};

export const defaultTitle = titles.default;
export const loginTitle = titles.login;
export const dashboardTitle = titles.dashboard;

export default titles;
