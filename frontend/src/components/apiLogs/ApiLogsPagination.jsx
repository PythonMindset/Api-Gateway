import React from 'react';
import {
    Box,
    Button,
    MenuItem,
    Select,
    Typography,
    Pagination
} from '@mui/material';

const ApiLogsPagination = ({ currentPage, totalPages, limit, totalItems, onPageChange, onLimitChange }) => {
    const startItem = (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, totalItems);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginTop: '1.5rem',
                alignItems: 'center'
            }}
        >
            {/* Items per page selector */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    alignSelf: 'flex-start'
                }}
            >
                <Typography sx={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    Per page:
                </Typography>
                <Select
                    value={limit}
                    onChange={(e) => onLimitChange(e.target.value)}
                    size="small"
                    sx={{
                        borderRadius: '0.375rem'
                    }}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </Box>

            {/* Pagination */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                <Typography sx={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    {startItem} to {endItem} of {totalItems}
                </Typography>

                {totalPages > 1 && (
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, page) => onPageChange(page)}
                        color="primary"
                        size="small"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                borderRadius: '0.375rem'
                            }
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default ApiLogsPagination;
