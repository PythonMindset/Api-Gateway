import React from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Skeleton,
    Box
} from '@mui/material';

const AccessRequestsTableSkeleton = ({ rows = 5 }) => {
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
                                    padding: '1rem'
                                }}
                            >
                                <Skeleton
                                    variant="text"
                                    width="80%"
                                    height={20}
                                    sx={{ backgroundColor: '#e5e7eb' }}
                                />
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '1rem'
                                }}
                            >
                                <Skeleton
                                    variant="text"
                                    width="70%"
                                    height={20}
                                    sx={{ backgroundColor: '#e5e7eb' }}
                                />
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '1rem'
                                }}
                            >
                                <Skeleton
                                    variant="text"
                                    width="85%"
                                    height={20}
                                    sx={{ backgroundColor: '#e5e7eb' }}
                                />
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '1rem'
                                }}
                            >
                                <Skeleton
                                    variant="rounded"
                                    width={90}
                                    height={24}
                                    sx={{ backgroundColor: '#e5e7eb' }}
                                />
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '1rem'
                                }}
                            >
                                <Skeleton
                                    variant="text"
                                    width="75%"
                                    height={20}
                                    sx={{ backgroundColor: '#e5e7eb' }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AccessRequestsTableSkeleton;
