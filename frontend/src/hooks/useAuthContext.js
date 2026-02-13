import React, { useState, useEffect, createContext, useContext } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                // Clear corrupted data
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                console.warn('Auth initialization error:', error);
            }
        };

        initializeAuth();
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const isAuthenticated = !!token;
    const isAdmin = user?.role === 'admin';

    const value = {
        user,
        token,
        isAuthenticated,
        isAdmin,
        login,
        logout,
    };

    return React.createElement(
        AuthContext.Provider,
        { value },
        children
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};