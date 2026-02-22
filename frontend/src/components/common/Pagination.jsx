import React from 'react';
import {
    Box,
    Select,
    MenuItem,
    Typography,
    Pagination
} from '@mui/material';

const CommonPagination = ({ 
    currentPage, 
    totalPages, 
    itemsPerPage, 
    totalItems,
    onPageChange, 
    onItemsPerPageChange,
    pageSizeOptions = [10, 25, 50, 100]
}) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

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
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(e.target.value)}
                    size="small"
                    sx={{
                        borderRadius: '0.375rem',
                        minWidth: '80px'
                    }}
                >
                    {pageSizeOptions.map(size => (
                        <MenuItem key={size} value={size}>{size}</MenuItem>
                    ))}
                </Select>
            </Box>

            {/* Info and pagination */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    gap: '1rem',
                    flexWrap: 'wrap'
                }}
            >
                <Typography sx={{ fontSize: '0.85rem', color: '#6b7280' }}>
                    Showing {startItem} to {endItem} of {totalItems} items
                </Typography>

                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, page) => onPageChange(page)}
                    size="small"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            fontSize: '0.85rem'
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default CommonPagination;
