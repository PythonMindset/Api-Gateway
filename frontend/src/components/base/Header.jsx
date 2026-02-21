import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    Divider,
    Stack
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Logout as LogoutIcon, Assessment, Lock, VpnKey } from '@mui/icons-material';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const managerName = import.meta.env.VITE_MANAGER_NAME || 'Project Manager';
    const projectManagerName = `${managerName}'s Projects`;

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        handleMenuClose();
    };

    const getInitials = (email) => {
        return email ? email.charAt(0).toUpperCase() : 'U';
    };

    const userInitials = getInitials(user?.email);

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                borderBottom: '1px solid #e5e7eb'
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1rem 2rem',
                    minHeight: '70px'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="h6"
                        onClick={() => navigate('/dashboard')}
                        sx={{
                            fontWeight: 600,
                            fontSize: '1rem',
                            color: '#374151',
                            letterSpacing: '0.5px',
                            cursor: 'pointer',
                            '&:hover': {
                                color: '#3b82f6',
                                transition: 'color 0.2s ease'
                            }
                        }}
                    >
                        {projectManagerName}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <Stack
                        direction="column"
                        spacing={0}
                        sx={{
                            textAlign: 'right',
                            marginRight: '0.5rem'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: '#1f2937'
                            }}
                        >
                            {user?.name || user?.email?.split('@')[0] || 'User'}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '0.8rem',
                                color: '#6b7280',
                                textTransform: 'capitalize'
                            }}
                        >
                            {user?.role || 'User'}
                        </Typography>
                    </Stack>

                    <Box>
                        <IconButton
                            onClick={handleMenuOpen}
                            sx={{
                                padding: '0.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                '&:hover': {
                                    backgroundColor: '#f3f4f6'
                                }
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: '#3b82f6',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                {userInitials}
                            </Avatar>
                            {open ? (
                                <KeyboardArrowUp
                                    sx={{
                                        color: '#6b7280',
                                        fontSize: '1.2rem'
                                    }}
                                />
                            ) : (
                                <KeyboardArrowDown
                                    sx={{
                                        color: '#6b7280',
                                        fontSize: '1.2rem'
                                    }}
                                />
                            )}
                        </IconButton>
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        PaperProps={{
                            sx: {
                                minWidth: '200px',
                                marginTop: '0.5rem',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                borderRadius: '0.5rem'
                            }
                        }}
                    >
                        <MenuItem disabled>
                            <Stack direction="column" spacing={0.5}>
                                <Typography
                                    sx={{
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        color: '#1f2937'
                                    }}
                                >
                                    {user?.name || user?.email?.split('@')[0] || 'User'}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '0.8rem',
                                        color: '#6b7280'
                                    }}
                                >
                                    {user?.email}
                                </Typography>
                            </Stack>
                        </MenuItem>
                        {user?.role === 'admin' && (
                            <>
                                <Divider sx={{ margin: '0.5rem 0' }} />
                                <MenuItem
                                    onClick={() => {
                                        navigate('/api-logs');
                                        handleMenuClose();
                                    }}
                                    sx={{
                                        color: '#1f2937',
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: '#f3f4f6'
                                        }
                                    }}
                                >
                                    <Assessment sx={{ marginRight: '0.5rem', fontSize: '1.2rem' }} />
                                    API Logs
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        navigate('/access-requests');
                                        handleMenuClose();
                                    }}
                                    sx={{
                                        color: '#1f2937',
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: '#f3f4f6'
                                        }
                                    }}
                                >
                                    <Lock sx={{ marginRight: '0.5rem', fontSize: '1.2rem' }} />
                                    Access Request
                                </MenuItem>
                            </>
                        )}
                        <Divider sx={{ margin: '0.5rem 0' }} />
                        <MenuItem
                            onClick={() => {
                                navigate('/change-password');
                                handleMenuClose();
                            }}
                            sx={{
                                color: '#1f2937',
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: '#f3f4f6'
                                }
                            }}
                        >
                            <VpnKey sx={{ marginRight: '0.5rem', fontSize: '1.2rem' }} />
                            Change Password
                        </MenuItem>
                        <Divider sx={{ margin: '0.5rem 0' }} />
                        <MenuItem
                            onClick={handleLogout}
                            sx={{
                                color: '#dc2626',
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: '#fee2e2'
                                }
                            }}
                        >
                            <LogoutIcon sx={{ marginRight: '0.5rem', fontSize: '1.2rem' }} />
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
