import React from 'react';
import {
    Box,
    Button,
    Select,
    MenuItem,
    Typography,
    Pagination,
    Stack
} from '@mui/material';

const AccessRequestsPagination = ({ 
    currentPage, 
    totalPages, 
    itemsPerPage, 
    totalItems,
    onPageChange, 
    onItemsPerPageChange 
}) => {
    return (
        <Box
            sx={{
                marginTop: '2rem',
                padding: '1.5rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        fontWeight: 500
                    }}
                >
                    Items per page:
                </Typography>
                <Select
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(e.target.value)}
                    size="small"
                    sx={{
                        minWidth: '70px',
                        height: '36px',
                        fontSize: '0.875rem',
                        backgroundColor: '#fff',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        '&:hover': {
                            borderColor: '#9ca3af'
                        }
                    }}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flex: 1
                }}
            >
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, page) => onPageChange(page)}
                    shape="rounded"
                    size="small"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            fontSize: '0.875rem',
                            color: '#374151',
                            border: '1px solid #e5e7eb',
                            '&:hover': {
                                backgroundColor: '#f3f4f6'
                            }
                        },
                        '& .Mui-selected': {
                            backgroundColor: '#3b82f6 !important',
                            color: '#fff !important',
                            border: '1px solid #3b82f6'
                        }
                    }}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '0.875rem',
                        color: '#6b7280'
                    }}
                >
                    Total: <strong>{totalItems}</strong>
                </Typography>
            </Box>
        </Box>
    );
};

export default AccessRequestsPagination;
