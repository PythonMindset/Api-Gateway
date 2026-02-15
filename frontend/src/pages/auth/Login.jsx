import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Stack,
    Divider,
} from '@mui/material';
import InputField from '../../components/InputField';
import PasswordInputField from '../../components/PasswordInputField';
import Button from '../../components/Button';
import { useToast } from '../../components/Toast';
import RequestAccessModal from '../../components/requestAccess/RequestAccessModal';
import { useAuthContext } from '../../hooks/useAuthContext';
import { usePageTitle } from '../../hooks/usePageTitle';
import { authAPI } from '../../api/auth';

const Login = () => {
    usePageTitle('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [requestAccessOpen, setRequestAccessOpen] = useState(false);

    const navigate = useNavigate();
    const { showToast } = useToast();
    const { login } = useAuthContext();

    const validateForm = () => {
        let isValid = true;

        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Please enter a valid email');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
            setLoading(true);
        try {
            const response = await authAPI.login(email, password);
            login(response.user, response.token);
            showToast('Login successful!', 'success');
            navigate('/dashboard');
        } catch (error) {
            showToast(error.message || 'Login failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleRequestAccess = () => {
        setRequestAccessOpen(true);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                width: '100%',
                overflow: 'hidden',

                /* Animations */
                '@keyframes float': {
                '0%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-15px)' },
                '100%': { transform: 'translateY(0px)' },
                },
                '@keyframes slideIn': {
                from: { opacity: 0, transform: 'translateX(40px)' },
                to: { opacity: 1, transform: 'translateX(0)' },
                },
                '@keyframes gradientMove': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' },
                },
            }}
            >
            {/* ================= LEFT HERO ================= */}
            <Box
                sx={{
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                px: 10,
                background: 'linear-gradient(-45deg, #0f172a, #1e293b, #111827, #1e3a8a)',
                backgroundSize: '400% 400%',
                animation: 'gradientMove 15s ease infinite',
                }}
            >
                {/* Glow Effects */}
                <Box
                sx={{
                    position: 'absolute',
                    width: 500,
                    height: 500,
                    background:
                    'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)',
                    top: -120,
                    left: -120,
                    filter: 'blur(100px)',
                }}
                />

                <Box
                sx={{
                    position: 'absolute',
                    width: 400,
                    height: 400,
                    background:
                    'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
                    bottom: -120,
                    right: -120,
                    filter: 'blur(100px)',
                }}
                />

                {/* Floating Cards */}
                <Box
                sx={{
                    position: 'absolute',
                    right: 100,
                    top: '25%',
                    width: 260,
                    height: 160,
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.1)',
                    animation: 'float 6s ease-in-out infinite',
                }}
                />

                <Box
                sx={{
                    position: 'absolute',
                    right: 150,
                    top: '48%',
                    width: 220,
                    height: 130,
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.08)',
                    animation: 'float 8s ease-in-out infinite',
                }}
                />

                {/* Hero Content */}
                <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 600 }}>
                    <Typography
                        sx={{
                        mb: 2,
                        px: 2,
                        py: 0.5,
                        display: 'inline-block',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderRadius: 5,
                        fontSize: 13,
                        letterSpacing: 1,
                        }}
                    >
                        INTERNAL PROJECT PLATFORM
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{ fontWeight: 700, mb: 3, lineHeight: 1.2 }}
                    >
                        Track Projects.
                        <br />
                        Manage Access.
                        <br />
                        Empower Your Team.
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ opacity: 0.75, mb: 5, fontWeight: 400 }}
                    >
                        A centralized workspace for your team. Users can request access
                        and view project details, while admins can upload, edit, or
                        deactivate projects with ease.
                    </Typography>

                    <Stack spacing={2}>
                        <Typography sx={{ opacity: 0.85 }}>
                        ✔ Role-Based Permissions for Secure Access
                        </Typography>
                        <Typography sx={{ opacity: 0.85 }}>
                        ✔ Smooth Access Request Workflow
                        </Typography>
                        <Typography sx={{ opacity: 0.85 }}>
                        ✔ Full Project Visibility & Status Monitoring
                        </Typography>
                        <Typography sx={{ opacity: 0.85 }}>
                        ✔ GitHub & Repository Linking for Developers
                        </Typography>
                    </Stack>
                </Box>
            </Box>

            {/* ================= RIGHT LOGIN ================= */}
            <Box
                sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                }}
            >
                <Box
                sx={{
                    width: 420,
                    p: 5,
                    backgroundColor: '#ffffff',
                    borderRadius: 3,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    animation: 'slideIn 0.6s ease forwards',
                }}
                >
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    Welcome Back
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ mb: 4, color: 'text.secondary' }}
                >
                    Sign in to access your dashboard
                </Typography>

                <Stack spacing={3} component="form" onSubmit={handleLogin}>
                    <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                    disabled={loading}
                    placeholder="Enter your email"
                    />

                    <PasswordInputField
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!passwordError}
                    helperText={passwordError}
                    disabled={loading}
                    placeholder="Enter your password"
                    />

                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    fullWidth
                    sx={{ py: 1.5 }}
                    >
                    {loading ? 'Logging in...' : 'Login'}
                    </Button>

                    <Divider sx={{ my: 1 }}>or</Divider>

                    <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={handleRequestAccess}
                    disabled={loading}
                    fullWidth
                    sx={{ py: 1.5 }}
                    >
                    Request Access
                    </Button>
                </Stack>
                </Box>
            </Box>

            <RequestAccessModal
                open={requestAccessOpen}
                onClose={() => setRequestAccessOpen(false)}
            />
        </Box>
    );
};

export default Login;
