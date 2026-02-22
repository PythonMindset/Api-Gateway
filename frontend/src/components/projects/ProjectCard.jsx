import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    IconButton,
    Tooltip,
    Stack,
    Divider,
    Button
} from '@mui/material';
import { 
    Edit as EditIcon, 
    Delete as DeleteIcon, 
    GitHub as GitHubIcon,
    OpenInNew as ExternalLinkIcon
} from '@mui/icons-material';
import { useAuthContext } from '../../hooks/useAuthContext';
import colors from '../../theme/color';

const ProjectCard = ({ project, onEdit, onDelete, onClick, isAdmin }) => {
    const { user } = useAuthContext();
    const shouldShowAdminActions = isAdmin !== undefined ? isAdmin : user?.role === 'admin';

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

    const statusStyle = getStatusColor(project.status);

    const handleStopPropagation = (callback) => (e) => {
        e.stopPropagation();
        callback?.();
    };

    return (
        <Card
            onClick={() => onClick?.(project)}
            sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '320px',
                width: '100%',
                '&:hover': {
                    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.15)',
                    transform: 'translateY(-2px)'
                }
            }}
        >
            <Box
                sx={{
                    padding: '1rem',
                    borderBottom: '1px solid #e5e7eb'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 700,
                                color: '#1f2937',
                                fontSize: '1rem',
                                wordBreak: 'break-word',
                                marginBottom: '0.5rem'
                            }}
                        >
                            {project.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#6b7280',
                                fontSize: '0.875rem',
                                lineHeight: 1.4,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {project.description || 'No description provided'}
                        </Typography>
                    </Box>

                    {shouldShowAdminActions && (
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '0.25rem',
                                flexShrink: 0
                            }}
                            onClick={handleStopPropagation(() => {})}
                        >
                            <Tooltip title="Edit">
                                <IconButton
                                    size="small"
                                    onClick={handleStopPropagation(() => onEdit?.(project))}
                                    sx={{
                                        color: '#6b7280',
                                        width: '32px',
                                        height: '32px',
                                        '&:hover': {
                                            backgroundColor: '#f3f4f6',
                                            color: '#1f2937'
                                        }
                                    }}
                                >
                                    <EditIcon sx={{ fontSize: '1rem' }} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete">
                                <IconButton
                                    size="small"
                                    onClick={handleStopPropagation(() => onDelete?.(project))}
                                    sx={{
                                        color: '#dc2626',
                                        width: '32px',
                                        height: '32px',
                                        '&:hover': {
                                            backgroundColor: '#fee2e2',
                                            color: '#b91c1c'
                                        }
                                    }}
                                >
                                    <DeleteIcon sx={{ fontSize: '1rem' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                </Box>
            </Box>

            <CardContent
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '1rem',
                    '&:last-child': {
                        paddingBottom: '1rem'
                    }
                }}
            >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {techStackArray.length > 0 ? (
                        techStackArray.slice(0, 4).map((tech, index) => (
                            <Chip
                                key={index}
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
                    ) : null}
                    {techStackArray.length > 4 && (
                        <Chip
                            label={`+${techStackArray.length - 4}`}
                            variant="outlined"
                            size="small"
                            sx={{
                                fontSize: '0.75rem',
                                height: '24px',
                                borderColor: '#e5e7eb',
                                backgroundColor: '#f9fafb',
                                color: '#6b7280'
                            }}
                        />
                    )}
                </Box>

                <Box sx={{ flex: 1 }} />

                <Divider sx={{ margin: '0' }} />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}
                >
                    <Chip
                        label={formatStatusText(project.status)}
                        sx={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.text,
                            border: `1px solid ${statusStyle.border}`,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: '24px'
                        }}
                    />

                    {project.repo_url && (
                        <Button
                            component="a"
                            href={project.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleStopPropagation(() => {})}
                            size="small"
                            sx={{
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: '#1f2937',
                                textTransform: 'none',
                                gap: '0.35rem',
                                '&:hover': {
                                    backgroundColor: '#f3f4f6'
                                }
                            }}
                        >
                            <ExternalLinkIcon sx={{ fontSize: '0.9rem' }} />
                            GitHub
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
