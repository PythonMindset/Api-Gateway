import React from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Typography,
    Chip,
    Box
} from '@mui/material';

const ApiLogsTable = ({ data, loading }) => {
    const getStatusColor = (status) => {
        if (status >= 200 && status < 300) {
            return { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' };
        } else if (status >= 300 && status < 400) {
            return { bg: '#dbeafe', text: '#0284c7', border: '#bae6fd' };
        } else if (status >= 400 && status < 500) {
            return { bg: '#fef3c7', text: '#ca8a04', border: '#fde68a' };
        } else if (status >= 500) {
            return { bg: '#fee2e2', text: '#dc2626', border: '#fecaca' };
        }
        return { bg: '#f3f4f6', text: '#6b7280', border: '#e5e7eb' };
    };

    const getLevelColor = (level) => {
        const levelColors = {
            info: { bg: '#dbeafe', text: '#0284c7', border: '#bae6fd' },
            warning: { bg: '#fef3c7', text: '#ca8a04', border: '#fde68a' },
            error: { bg: '#fee2e2', text: '#dc2626', border: '#fecaca' }
        };
        return levelColors[level] || levelColors.info;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatEndpoint = (endpoint) => {
        if (!endpoint) return '-';
        return endpoint.length > 40 ? endpoint.substring(0, 37) + '...' : endpoint;
    };

    const getMethodColor = (method) => {
        const methodColors = {
            GET: '#3b82f6',
            POST: '#10b981',
            PUT: '#f59e0b',
            DELETE: '#ef4444',
            PATCH: '#8b5cf6',
            OPTIONS: '#6b7280',
            HEAD: '#6b7280'
        };
        return methodColors[method] || '#6b7280';
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                overflowX: 'auto'
            }}
        >
            <Table sx={{ minWidth: '900px' }}>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: '#f9fafb',
                            borderBottom: '1px solid #e5e7eb'
                        }}
                    >
                        <TableCell
                            sx={{
                                fontWeight: 600,
                                color: '#374151',
                                padding: '0.75rem',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px',
                                minWidth: '70px'
                            }}
                        >
                            Method
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 600,
                                color: '#374151',
                                padding: '0.75rem',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px',
                                minWidth: '180px'
                            }}
                        >
                            Endpoint
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 600,
                                color: '#374151',
                                padding: '0.75rem',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px',
                                minWidth: '70px'
                            }}
                        >
                            Status
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 600,
                                color: '#374151',
                                padding: '0.75rem',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px',
                                minWidth: '70px'
                            }}
                        >
                            Level
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 600,
                                color: '#374151',
                                padding: '0.75rem',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px',
                                minWidth: '70px'
                            }}
                        >
                            User ID
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 600,
                                color: '#374151',
                                padding: '0.75rem',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px',
                                minWidth: '80px'
                            }}
                        >
                            Role
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 600,
                                color: '#374151',
                                padding: '0.75rem',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px',
                                minWidth: '120px'
                            }}
                        >
                            User
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 600,
                                color: '#374151',
                                padding: '0.75rem',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px',
                                minWidth: '160px'
                            }}
                        >
                            Time
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((log) => {
                            const statusColor = getStatusColor(log.status_code);
                            const levelColor = getLevelColor(log.level);
                            const methodColor = getMethodColor(log.method);
                            return (
                                <TableRow
                                    key={log.id}
                                    sx={{
                                        borderBottom: '1px solid #e5e7eb',
                                        '&:hover': {
                                            backgroundColor: '#f9fafb'
                                        },
                                        '&:last-child td': {
                                            borderBottom: 'none'
                                        }
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            padding: '0.75rem',
                                            color: '#fff',
                                            backgroundColor: methodColor,
                                            fontWeight: 600,
                                            fontSize: '0.85rem',
                                            borderRadius: '0.25rem',
                                            textAlign: 'center',
                                            minWidth: '70px'
                                        }}
                                    >
                                        {log.method}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '0.75rem',
                                            color: '#4b5563',
                                            fontSize: '0.85rem',
                                            minWidth: '180px',
                                            fontFamily: 'JetBrains Mono, monospace',
                                            maxWidth: '180px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                        title={log.endpoint}
                                    >
                                        {formatEndpoint(log.endpoint)}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '0.75rem',
                                            minWidth: '70px'
                                        }}
                                    >
                                        <Chip
                                            label={log.status_code}
                                            size="small"
                                            sx={{
                                                backgroundColor: statusColor.bg,
                                                color: statusColor.text,
                                                border: `1px solid ${statusColor.border}`,
                                                fontWeight: 600,
                                                fontSize: '0.8rem',
                                                height: '24px'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '0.75rem',
                                            minWidth: '70px'
                                        }}
                                    >
                                        <Chip
                                            label={log.level ? log.level.charAt(0).toUpperCase() + log.level.slice(1) : 'Unknown'}
                                            size="small"
                                            sx={{
                                                backgroundColor: levelColor.bg,
                                                color: levelColor.text,
                                                border: `1px solid ${levelColor.border}`,
                                                fontWeight: 600,
                                                fontSize: '0.8rem',
                                                height: '24px'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '0.75rem',
                                            color: '#4b5563',
                                            fontSize: '0.85rem',
                                            minWidth: '70px',
                                            fontWeight: 500
                                        }}
                                    >
                                        {log.user_id || '-'}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '0.75rem',
                                            minWidth: '80px'
                                        }}
                                    >
                                        <Chip
                                            label={log.role ? log.role.charAt(0).toUpperCase() + log.role.slice(1) : '-'}
                                            size="small"
                                            sx={{
                                                backgroundColor: log.role === 'admin' ? '#dbeafe' : '#fef3c7',
                                                color: log.role === 'admin' ? '#0284c7' : '#ca8a04',
                                                border: `1px solid ${log.role === 'admin' ? '#bae6fd' : '#fde68a'}`,
                                                fontWeight: 600,
                                                fontSize: '0.8rem',
                                                height: '24px'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '0.75rem',
                                            color: '#4b5563',
                                            fontSize: '0.85rem',
                                            minWidth: '120px'
                                        }}
                                    >
                                        {log.user_name || '-'}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '0.75rem',
                                            color: '#4b5563',
                                            fontSize: '0.8rem',
                                            minWidth: '160px',
                                            fontFamily: 'JetBrains Mono, monospace'
                                        }}
                                    >
                                        {formatDate(log.timestamp)}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                sx={{
                                    padding: '2rem',
                                    textAlign: 'center',
                                    color: '#6b7280'
                                }}
                            >
                                <Typography sx={{ fontSize: '0.95rem' }}>
                                    No API logs found
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ApiLogsTable;
