import React, { useState, useEffect, createContext, useContext } from 'react';
const AuthContext = createContext();

const initializeAuthState = () => {
    try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            return {
                token: storedToken,
                user: JSON.parse(storedUser),
            };
        }
    } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.warn('Auth initialization error:', error);
    }

    return {
        token: null,
        user: null,
    };
};

export const AuthProvider = ({ children }) => {
    const initialAuth = initializeAuthState();
    const [user, setUser] = useState(initialAuth.user);
    const [token, setToken] = useState(initialAuth.token);

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