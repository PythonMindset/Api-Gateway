import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Stack,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../Button';
import InputField from '../InputField';
import { useToast } from '../Toast';
import { authAPI } from '../../api/auth';

const RequestAccessModal = ({ open, onClose }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { showToast } = useToast();

    const resetForm = () => {
        setEmail('');
        setName('');
        setDescription('');
        setErrors({});
        setSubmitted(false);
    };

    // Reset form when modal opens
    React.useEffect(() => {
        if (open) {
            resetForm();
        }
    }, [open]);

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (description.length > 1000) {
            newErrors.description = 'Description must be less than 1000 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await authAPI.requestAccess(email, name, description);
            setSubmitted(true);
            showToast(
                'Access request submitted successfully! Check your email for login credentials.',
                'success'
            );
        } catch (error) {
            if (error.message.includes('already exists')) {
                showToast('User already exists. Please log in instead.', 'error');
                resetForm();
                onClose();
            } else {
                showToast(error.message || 'Failed to submit access request', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 25px 80px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                },
            }}
        >
            {submitted ? (
                // Success State
                <Box
                    sx={{
                        background: 'linear-gradient(-45deg, #0f172a, #1e293b, #111827, #1e3a8a)',
                        backgroundSize: '400% 400%',
                        animation: 'gradientMove 15s ease infinite',
                        '@keyframes gradientMove': {
                            '0%': { backgroundPosition: '0% 50%' },
                            '50%': { backgroundPosition: '100% 50%' },
                            '100%': { backgroundPosition: '0% 50%' },
                        },
                        minHeight: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#fff',
                        p: 4,
                        textAlign: 'center',
                        position: 'relative',
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            color: '#fff',
                            '&:hover': {
                                background: 'rgba(255,255,255,0.1)',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box
                        sx={{
                            fontSize: 60,
                            mb: 2,
                            animation: 'float 3s ease-in-out infinite',
                            '@keyframes float': {
                                '0%': { transform: 'translateY(0px)' },
                                '50%': { transform: 'translateY(-15px)' },
                                '100%': { transform: 'translateY(0px)' },
                            },
                        }}
                    >
                        ✓
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                        Request Submitted!
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.85, mb: 3, maxWidth: 400 }}>
                        Thank you for your request. Check your email for login credentials. You have 7 days to change your password before the account is deleted.
                    </Typography>
                </Box>
            ) : (
                <DialogContent sx={{ p: 0 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 600 }}>
                        {/* Left Side - Info Section */}
                        <Box
                            sx={{
                                background: 'linear-gradient(-45deg, #0f172a, #1e293b, #111827, #1e3a8a)',
                                backgroundSize: '400% 400%',
                                animation: 'gradientMove 15s ease infinite',
                                '@keyframes gradientMove': {
                                    '0%': { backgroundPosition: '0% 50%' },
                                    '50%': { backgroundPosition: '100% 50%' },
                                    '100%': { backgroundPosition: '0% 50%' },
                                },
                                color: '#fff',
                                p: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Glow Effects */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: 300,
                                    height: 300,
                                    background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
                                    top: -100,
                                    left: -100,
                                    filter: 'blur(80px)',
                                }}
                            />

                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: 250,
                                    height: 250,
                                    background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
                                    bottom: -80,
                                    right: -80,
                                    filter: 'blur(80px)',
                                }}
                            />

                            <Box sx={{ position: 'relative', zIndex: 2 }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 3,
                                        background: 'linear-gradient(135deg, #60a5fa, #c4b5fd)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Important Information
                                </Typography>

                                <Stack spacing={3}>
                                    {/* Password Change Notice */}
                                    <Box
                                        sx={{
                                            p: 2.5,
                                            background: 'rgba(255,255,255,0.08)',
                                            backdropFilter: 'blur(12px)',
                                            borderRadius: 2,
                                            border: '1px solid rgba(255,255,255,0.15)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                background: 'rgba(255,255,255,0.12)',
                                                border: '1px solid rgba(255,255,255,0.25)',
                                            },
                                        }}
                                    >
                                        <Typography sx={{ fontSize: 12, fontWeight: 700, mb: 1, color: '#fca5a5' }}>
                                            🔐 PASSWORD CHANGE REQUIRED
                                        </Typography>
                                        <Typography sx={{ fontSize: 13, opacity: 0.9, lineHeight: 1.6 }}>
                                            After login, you <strong>must change your password within 7 days</strong>. Failure to do so will result in automatic account deletion.
                                        </Typography>
                                    </Box>

                                    {/* Access Expiration Notice */}
                                    <Box
                                        sx={{
                                            p: 2.5,
                                            background: 'rgba(255,255,255,0.08)',
                                            backdropFilter: 'blur(12px)',
                                            borderRadius: 2,
                                            border: '1px solid rgba(255,255,255,0.15)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                background: 'rgba(255,255,255,0.12)',
                                                border: '1px solid rgba(255,255,255,0.25)',
                                            },
                                        }}
                                    >
                                        <Typography sx={{ fontSize: 12, fontWeight: 700, mb: 1, color: '#fbbf24' }}>
                                            ⏰ ACCESS EXPIRATION
                                        </Typography>
                                        <Typography sx={{ fontSize: 13, opacity: 0.9, lineHeight: 1.6 }}>
                                            If you don't access the platform within <strong>30 days</strong>, your account will be automatically deleted.
                                        </Typography>
                                    </Box>

                                    {/* Account Status Notice */}
                                    <Box
                                        sx={{
                                            p: 2.5,
                                            background: 'rgba(255,255,255,0.08)',
                                            backdropFilter: 'blur(12px)',
                                            borderRadius: 2,
                                            border: '1px solid rgba(255,255,255,0.15)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                background: 'rgba(255,255,255,0.12)',
                                                border: '1px solid rgba(255,255,255,0.25)',
                                            },
                                        }}
                                    >
                                        <Typography sx={{ fontSize: 12, fontWeight: 700, mb: 1, color: '#86efac' }}>
                                            ✓ ACCOUNT STATUS
                                        </Typography>
                                        <Typography sx={{ fontSize: 13, opacity: 0.9, lineHeight: 1.6 }}>
                                            Your account will be <strong>verified by our admin team</strong> (usually within 24 hours). Once approved, you'll have full platform access.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>

                        {/* Right Side - Form Section */}
                        <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                                Request Access
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ mb: 4, color: 'text.secondary', opacity: 0.8 }}
                            >
                                Fill in your details to request platform access
                            </Typography>

                            <Stack spacing={2.5} component="form" onSubmit={handleSubmit}>
                                <InputField
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    disabled={loading}
                                    placeholder="your.email@company.com"
                                />

                                <InputField
                                    label="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    disabled={loading}
                                    placeholder="John Doe"
                                />

                                <InputField
                                    label="Why do you need access?"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    error={!!errors.description}
                                    helperText={
                                        errors.description ||
                                        `${description.length}/1000 characters`
                                    }
                                    disabled={loading}
                                    placeholder="Brief description of your role and purpose..."
                                    multiline
                                    rows={3}
                                />

                                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleClose}
                                        disabled={loading}
                                        fullWidth
                                        sx={{ py: 1.5 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        fullWidth
                                        sx={{ py: 1.5 }}
                                    >
                                        {loading ? 'Submitting...' : 'Submit Request'}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </DialogContent>
            )}
        </Dialog>
    );
};

export default RequestAccessModal;
