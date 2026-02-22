import React from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Skeleton
} from '@mui/material';

const ApiLogsTableSkeleton = ({ rows = 10 }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
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
                                minWidth: '160px'
                            }}
                        >
                            Time
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: rows }).map((_, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                borderBottom: '1px solid #e5e7eb',
                                '&:last-child td': {
                                    borderBottom: 'none'
                                }
                            }}
                        >
                            <TableCell
                                sx={{
                                    padding: '0.75rem',
                                    minWidth: '70px'
                                }}
                            >
                                <Skeleton variant="text" width="100%" height={24} />
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '0.75rem',
                                    minWidth: '180px'
                                }}
                            >
                                <Skeleton variant="text" width="100%" />
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '0.75rem',
                                    minWidth: '70px'
                                }}
                            >
                                <Skeleton variant="text" width="100%" height={24} />
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '0.75rem',
                                    minWidth: '70px'
                                }}
                            >
                                <Skeleton variant="text" width="100%" height={24} />
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '0.75rem',
                                    minWidth: '70px'
                                }}
                            >
                                <Skeleton variant="text" width="100%" />
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '0.75rem',
                                    minWidth: '80px'
                                }}
                            >
                                <Skeleton variant="rounded" width="60px" height={24} />
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '0.75rem',
                                    minWidth: '120px'
                                }}
                            >
                                <Skeleton variant="text" width="80%" />
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '0.75rem',
                                    minWidth: '160px'
                                }}
                            >
                                <Skeleton variant="text" width="100%" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ApiLogsTableSkeleton;
