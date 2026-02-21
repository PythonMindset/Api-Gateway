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

const AccessRequestsTable = ({ data, loading }) => {
    const getStatusColor = (status) => {
        const statusColors = {
            pending: { bg: '#fef3c7', text: '#ca8a04', border: '#fde68a' },
            approved: { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' },
            rejected: { bg: '#fee2e2', text: '#dc2626', border: '#fecaca' },
            active: { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' },
            deactivated: { bg: '#f3f4f6', text: '#6b7280', border: '#e5e7eb' }
        };
        return statusColors[status] || statusColors.pending;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusLabel = (status) => {
        return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: '0.5rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb'
            }}
        >
            <Table>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: '#f9fafb',
                            borderBottom: '1px solid #e5e7eb'
                        }}
                    >
                        <TableCell
                            sx={{
                                fontWeight: 700,
                                color: '#374151',
                                padding: '1rem',
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Email
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 700,
                                color: '#374151',
                                padding: '1rem',
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Name
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 700,
                                color: '#374151',
                                padding: '1rem',
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Description
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 700,
                                color: '#374151',
                                padding: '1rem',
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Status
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 700,
                                color: '#374151',
                                padding: '1rem',
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Requested On
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((request) => {
                            const statusColor = getStatusColor(request.status);
                            return (
                                <TableRow
                                    key={request.id}
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
                                            padding: '1rem',
                                            color: '#4b5563',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {request.email}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '1rem',
                                            color: '#4b5563',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {request.name || '-'}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '1rem',
                                            color: '#4b5563',
                                            fontSize: '0.9rem',
                                            maxWidth: '300px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                        title={request.description || '-'}
                                    >
                                        {request.description || '-'}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '1rem'
                                        }}
                                    >
                                        <Chip
                                            label={getStatusLabel(request.status)}
                                            sx={{
                                                backgroundColor: statusColor.bg,
                                                color: statusColor.text,
                                                border: `1px solid ${statusColor.border}`,
                                                fontWeight: 600,
                                                fontSize: '0.75rem',
                                                height: '24px'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '1rem',
                                            color: '#6b7280',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {formatDate(request.requested_on)}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} sx={{ padding: '2rem', textAlign: 'center' }}>
                                <Typography sx={{ color: '#6b7280' }}>
                                    {loading ? 'Loading...' : 'No access requests found'}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AccessRequestsTable;
