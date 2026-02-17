import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePageTitle } from '../hooks/usePageTitle';

const Dashboard = () => {
    usePageTitle('dashboard');

    const { user, logout } = useAuthContext();
    return (
        <div style={{
            padding: '2rem',
            fontFamily: 'Inter, sans-serif',
            minHeight: '100vh',
            backgroundColor: '#f8fafc'
        }}>
        <h1>Welcome to Dashboard</h1>
        <p>Hello, {user?.email}!</p>
        <p>Role: {user?.role}</p>
        <button
            onClick={logout}
            style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif'
            }}
        >
            Logout
        </button>
        </div>
    );
};

export default Dashboard;