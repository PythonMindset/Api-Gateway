import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Chip,
    Divider,
    Stack,
    Grid,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Close as CloseIcon,
    OpenInNew as ExternalLinkIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { useAuthContext } from '../../hooks/useAuthContext';

const ProjectDetailsModal = ({
    open,
    project,
    onClose,
    onEdit,
    onDelete,
    isAdmin
}) => {
    const { user } = useAuthContext();
    const shouldShowAdminActions = isAdmin !== undefined ? isAdmin : user?.role === 'admin';

    if (!project) return null;

    const techStackArray = typeof project.tech_stack === 'string'
        ? project.tech_stack.split(',').map(tech => tech.trim())
        : project.tech_stack || [];

    const getStatusColor = (status) => {
        const statusColors = {
            planning: { bg: '#dbeafe', text: '#0284c7', border: '#bfdbfe' },
            testing: { bg: '#fef3c7', text: '#ca8a04', border: '#fde68a' },
            completed: { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' },
            live: { bg: '#d1fae5', text: '#059669', border: '#a7f3d0' },
            on_hold: { bg: '#fee2e2', text: '#dc2626', border: '#fecaca' },
            archived: { bg: '#f3f4f6', text: '#4b5563', border: '#e5e7eb' }
        };
        return statusColors[status] || statusColors.archived;
    };

    const formatStatusText = (status) => {
        return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const statusStyle = getStatusColor(project.status);

    const handleStopPropagation = (callback) => (e) => {
        e.stopPropagation();
        callback?.();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
                }
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem',
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: '#fafbfc'
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#1f2937',
                            fontSize: '1.1rem',
                            marginBottom: '0.25rem'
                        }}
                    >
                        {project.title}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: '#6b7280',
                            fontSize: '0.8rem'
                        }}
                    >
                        Created {new Date(project.created_at).toLocaleDateString()}
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: '#6b7280',
                        '&:hover': {
                            backgroundColor: '#f3f4f6'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ padding: '1.5rem' }}>
                <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: 600,
                                    color: '#6b7280',
                                    textTransform: 'uppercase',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.5px',
                                    display: 'block',
                                    marginBottom: '0.5rem'
                                }}
                            >
                                Status
                            </Typography>
                            <Chip
                                label={formatStatusText(project.status)}
                                sx={{
                                    backgroundColor: statusStyle.bg,
                                    color: statusStyle.text,
                                    border: `1px solid ${statusStyle.border}`,
                                    fontWeight: 600,
                                    fontSize: '0.8rem',
                                    height: '28px',
                                    width: '100%',
                                    justifyContent: 'center'
                                }}
                            />
                        </Box>

                        {shouldShowAdminActions && (
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#6b7280',
                                        textTransform: 'uppercase',
                                        fontSize: '0.7rem',
                                        letterSpacing: '0.5px',
                                        display: 'block',
                                        marginBottom: '0.5rem'
                                    }}
                                >
                                    Visibility
                                </Typography>
                                <Chip
                                    label={project.is_public ? 'Public' : 'Private'}
                                    sx={{
                                        fontSize: '0.8rem',
                                        height: '28px',
                                        width: '100%',
                                        justifyContent: 'center',
                                        backgroundColor: project.is_public ? '#dcfce7' : '#fee2e2',
                                        color: project.is_public ? '#16a34a' : '#dc2626',
                                        border: `1px solid ${project.is_public ? '#bbf7d0' : '#fecaca'}`,
                                        fontWeight: 600
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                    <Box>
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 600,
                                color: '#6b7280',
                                textTransform: 'uppercase',
                                fontSize: '0.7rem',
                                letterSpacing: '0.5px',
                                display: 'block',
                                marginBottom: '0.5rem'
                            }}
                        >
                            Description
                        </Typography>
                        <Typography
                            sx={{
                                color: '#4b5563',
                                lineHeight: 1.6,
                                fontSize: '0.9rem',
                                backgroundColor: '#f9fafb',
                                padding: '0.75rem',
                                borderRadius: '0.375rem',
                                border: '1px solid #e5e7eb',
                                minHeight: '60px'
                            }}
                        >
                            {project.description || 'No description provided'}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 600,
                                color: '#6b7280',
                                textTransform: 'uppercase',
                                fontSize: '0.7rem',
                                letterSpacing: '0.5px',
                                display: 'block',
                                marginBottom: '0.5rem'
                            }}
                        >
                            Tech Stack
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {techStackArray.length > 0 ? (
                                techStackArray.map((tech) => (
                                    <Chip
                                        key={tech}
                                        label={tech}
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            fontSize: '0.75rem',
                                            height: '24px',
                                            borderColor: '#e5e7eb',
                                            backgroundColor: '#f9fafb',
                                            color: '#4b5563'
                                        }}
                                    />
                                ))
                            ) : (
                                <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                                    No tech stack specified
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    {project.repo_url && (
                        <Box>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: 600,
                                    color: '#6b7280',
                                    textTransform: 'uppercase',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.5px',
                                    display: 'block',
                                    marginBottom: '0.5rem'
                                }}
                            >
                                Repository
                            </Typography>
                            <Button
                                component="a"
                                href={project.repo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outlined"
                                size="small"
                                endIcon={<ExternalLinkIcon sx={{ fontSize: '0.9rem' }} />}
                                fullWidth
                                sx={{
                                    textTransform: 'none',
                                    color: '#3b82f6',
                                    borderColor: '#dbeafe',
                                    backgroundColor: '#f0f9ff',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    '&:hover': {
                                        borderColor: '#3b82f6',
                                        backgroundColor: '#e0f2fe'
                                    }
                                }}
                            >
                                View on GitHub
                            </Button>
                        </Box>
                    )}

                    <Box sx={{ backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #e5e7eb' }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#6b7280',
                                fontSize: '0.75rem',
                                display: 'block'
                            }}
                        >
                            Last updated {new Date(project.updated_at).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Stack>
            </DialogContent>

            {shouldShowAdminActions && (
                <DialogActions
                    sx={{
                        padding: '1rem 1.5rem',
                        borderTop: '1px solid #e5e7eb',
                        backgroundColor: '#fafbfc',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                        <Tooltip title="Edit">
                            <IconButton
                                onClick={handleStopPropagation(() => onEdit?.(project))}
                                size="small"
                                sx={{
                                    color: '#3b82f6',
                                    '&:hover': {
                                        backgroundColor: '#dbeafe'
                                    }
                                }}
                            >
                                <EditIcon sx={{ fontSize: '1.1rem' }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                            <IconButton
                                onClick={handleStopPropagation(() => onDelete?.(project))}
                                size="small"
                                sx={{
                                    color: '#dc2626',
                                    '&:hover': {
                                        backgroundColor: '#fee2e2'
                                    }
                                }}
                            >
                                <DeleteIcon sx={{ fontSize: '1.1rem' }} />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Button
                        onClick={onClose}
                        variant="text"
                        sx={{
                            color: '#6b7280',
                            textTransform: 'none',
                            fontSize: '0.9rem',
                            '&:hover': {
                                backgroundColor: '#f3f4f6'
                            }
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            )}

            {!shouldShowAdminActions && (
                <DialogActions
                    sx={{
                        padding: '1rem 1.5rem',
                        borderTop: '1px solid #e5e7eb',
                        backgroundColor: '#fafbfc'
                    }}
                >
                    <Button
                        onClick={onClose}
                        variant="text"
                        sx={{
                            color: '#6b7280',
                            textTransform: 'none',
                            fontSize: '0.9rem',
                            '&:hover': {
                                backgroundColor: '#f3f4f6'
                            }
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default ProjectDetailsModal;
