import React from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    IconButton,
    Tooltip,
    Box,
    Paper
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    OpenInNew as ExternalLinkIcon
} from '@mui/icons-material';
import { useAuthContext } from '../../hooks/useAuthContext';

const ProjectListView = ({ projects, onEdit, onDelete, onClick }) => {
    const { user } = useAuthContext();
    const isAdmin = user?.role === 'admin';

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

    const getTechStack = (techStackStr) => {
        if (typeof techStackStr === 'string') {
            return techStackStr.split(',').map(tech => tech.trim());
        }
        return techStackStr || [];
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem'
            }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="projects table">
                <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                    <TableRow sx={{ borderBottom: '2px solid #e5e7eb' }}>
                        <TableCell sx={{ fontWeight: 700, color: '#1f2937', width: '20%' }}>
                            Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#1f2937', width: '30%' }}>
                            Description
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#1f2937', width: '20%' }}>
                            Tech Stack
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: 700, color: '#1f2937', width: '12%' }}
                        >
                            Status
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#1f2937', width: '10%' }}>
                            Links
                        </TableCell>
                        {isAdmin && (
                            <TableCell align="right" sx={{ fontWeight: 700, color: '#1f2937', width: '8%' }}>
                                Actions
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project, index) => {
                        const techStack = getTechStack(project.tech_stack);
                        const statusStyle = getStatusColor(project.status);

                        return (
                            <TableRow
                                onClick={() => onClick?.(project)}
                                key={project.id}
                                sx={{
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #e5e7eb',
                                    '&:hover': {
                                        backgroundColor: '#f3f4f6'
                                    },
                                    '&:last-child td, &:last-child th': {
                                        border: 0
                                    }
                                }}
                            >
                                        <TableCell
                                    sx={{
                                        fontWeight: 600,
                                        color: '#1f2937',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    {project.title}
                                </TableCell>

                                <TableCell
                                    sx={{
                                        color: '#6b7280',
                                        fontSize: '0.875rem',
                                        maxWidth: '300px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                    title={project.description}
                                >
                                    {project.description || 'No description'}
                                </TableCell>

                                <TableCell sx={{ fontSize: '0.875rem' }}>
                                    <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                        {techStack.slice(0, 2).map((tech) => (
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
                                        ))}
                                        {techStack.length > 2 && (
                                            <Chip
                                                label={`+${techStack.length - 2}`}
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
                                </TableCell>

                                <TableCell align="center">
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
                                </TableCell>

                                <TableCell>
                                    {project.repo_url && (
                                        <Tooltip title={project.repo_url} arrow>
                                            <IconButton
                                                component="a"
                                                href={project.repo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                size="small"
                                                sx={{
                                                    color: '#1f2937',
                                                    padding: '0.5rem',
                                                    '&:hover': {
                                                        backgroundColor: '#f3f4f6'
                                                    }
                                                }}
                                            >
                                                <ExternalLinkIcon sx={{ fontSize: '1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </TableCell>

                                {isAdmin && (
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', gap: '0.25rem', justifyContent: 'flex-end' }}>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onEdit?.(project);
                                                    }}
                                                    sx={{
                                                        color: '#6b7280',
                                                        padding: '0.4rem',
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
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onDelete?.(project);
                                                    }}
                                                    sx={{
                                                        color: '#dc2626',
                                                        padding: '0.4rem',
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
                                    </TableCell>
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProjectListView;
