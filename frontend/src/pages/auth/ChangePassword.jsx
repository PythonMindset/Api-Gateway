import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Stack,
    Card,
    CardContent,
    Alert,
    CircularProgress
} from '@mui/material';
import PasswordInputField from '../../components/PasswordInputField';
import Button from '../../components/Button';
import { useToast } from '../../components/Toast';
import Header from '../../components/base/Header';
import { useChangePassword } from '../../hooks/useUser';
import { usePageTitle } from '../../hooks/usePageTitle';

const ChangePassword = () => {
    usePageTitle('change password');
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { changePassword, loading, error: hookError } = useChangePassword();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validateForm = () => {
        let isValid = true;

        if (!currentPassword.trim()) {
            setCurrentPasswordError('Current password is required');
            isValid = false;
        } else {
            setCurrentPasswordError('');
        }

        if (!newPassword.trim()) {
            setNewPasswordError('New password is required');
            isValid = false;
        } else if (newPassword.length < 6) {
            setNewPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setNewPasswordError('');
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Please confirm your password');
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await changePassword(currentPassword, newPassword);
            showToast('Password changed successfully!', 'success');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (err) {
            showToast(err.message || 'Failed to change password', 'error');
        }
    };

    const handleInputChange = (setter, errorSetter) => (e) => {
        const value = e.target ? e.target.value : e;
        setter(value);
        errorSetter('');
    };

    return (
        <div
            style={{
                fontFamily: 'Inter, sans-serif',
                minHeight: '100vh',
                backgroundColor: '#f8fafc'
            }}
        >
            <Header />
            <Container maxWidth="sm">
                <Box
                    sx={{
                        paddingY: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minHeight: 'calc(100vh - 80px)'
                    }}
                >
                    <Card
                        sx={{
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <CardContent sx={{ padding: '2rem' }}>
                            {/* Header */}
                            <Box sx={{ marginBottom: '2rem' }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: '#1f2937',
                                        marginBottom: '0.5rem'
                                    }}
                                >
                                    Change Password
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '0.9rem',
                                        color: '#6b7280'
                                    }}
                                >
                                    Update your account password to keep your account secure
                                </Typography>
                            </Box>

                            {/* Form */}
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    {/* Current Password */}
                                    <Box>
                                        <PasswordInputField
                                            label="Current Password"
                                            value={currentPassword}
                                            onChange={handleInputChange(
                                                setCurrentPassword,
                                                setCurrentPasswordError
                                            )}
                                            error={currentPasswordError}
                                            placeholder="Enter your current password"
                                            disabled={loading}
                                        />
                                    </Box>

                                    {/* New Password */}
                                    <Box>
                                        <PasswordInputField
                                            label="New Password"
                                            value={newPassword}
                                            onChange={handleInputChange(
                                                setNewPassword,
                                                setNewPasswordError
                                            )}
                                            error={newPasswordError}
                                            placeholder="Enter your new password"
                                            disabled={loading}
                                        />
                                    </Box>

                                    {/* Confirm Password */}
                                    <Box>
                                        <PasswordInputField
                                            label="Confirm Password"
                                            value={confirmPassword}
                                            onChange={handleInputChange(
                                                setConfirmPassword,
                                                setConfirmPasswordError
                                            )}
                                            error={confirmPasswordError}
                                            placeholder="Confirm your new password"
                                            disabled={loading}
                                        />
                                    </Box>

                                    {/* Submit Button */}
                                    <Box sx={{ marginTop: '1.5rem' }}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            disabled={loading}
                                            sx={{
                                                height: '40px',
                                                fontSize: '0.9rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            {loading ? (
                                                <CircularProgress
                                                    size={20}
                                                    sx={{ color: 'white' }}
                                                />
                                            ) : (
                                                'Change Password'
                                            )}
                                        </Button>
                                    </Box>

                                    {/* Back to Dashboard */}
                                    <Box sx={{ marginTop: '1rem' }}>
                                        <Button
                                            onClick={() => navigate('/dashboard')}
                                            variant="text"
                                            fullWidth
                                            disabled={loading}
                                            sx={{
                                                height: '40px',
                                                fontSize: '0.9rem',
                                                color: '#6b7280'
                                            }}
                                        >
                                            Back to Dashboard
                                        </Button>
                                    </Box>
                                </Stack>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </div>
    );
};

export default ChangePassword;
