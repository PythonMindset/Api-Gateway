import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    MenuItem
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

const ApiLogsFilters = ({ filters, onFilterChange, loading }) => {
    const [localFilters, setLocalFilters] = useState(filters);
    const debounceTimeout = React.useRef({});

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleLocalFilterChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters(prev => ({
            ...prev,
            [name]: value
        }));

        if (debounceTimeout.current[name]) {
            clearTimeout(debounceTimeout.current[name]);
        }

        debounceTimeout.current[name] = setTimeout(() => {
            onFilterChange({
                ...localFilters,
                [name]: value
            });
        }, 500);
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters(prev => ({
            ...prev,
            [name]: value
        }));
        onFilterChange({
            ...localFilters,
            [name]: value
        });
    };

    const handleClearFilters = () => {
        setLocalFilters({
            user_id: '',
            endpoint: '',
            method: '',
            status_code: '',
            level: '',
            role: ''
        });
        onFilterChange({
            user_id: '',
            endpoint: '',
            method: '',
            status_code: '',
            level: '',
            role: ''
        });
    };

    const hasActiveFilters = Object.values(localFilters).some(value => value !== '');

    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: '0.5rem',
                padding: '1rem',
                border: '1px solid #e5e7eb'
            }}
        >
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4} md={1}>
                    <TextField
                        fullWidth
                        size="small"
                        label="User ID"
                        name="user_id"
                        value={localFilters.user_id}
                        onChange={handleLocalFilterChange}
                        disabled={loading}
                        placeholder="123"
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={4} md={2}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Method"
                        name="method"
                        value={localFilters.method}
                        onChange={handleSelectChange}
                        select
                        disabled={loading}
                        variant="outlined"
                        sx={{
                            minWidth: '100px'
                        }}
                    >
                        <MenuItem value="">All Methods</MenuItem>
                        <MenuItem value="GET">GET</MenuItem>
                        <MenuItem value="POST">POST</MenuItem>
                        <MenuItem value="PUT">PUT</MenuItem>
                        <MenuItem value="DELETE">DELETE</MenuItem>
                        <MenuItem value="PATCH">PATCH</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4} md={1}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Status"
                        name="status_code"
                        value={localFilters.status_code}
                        onChange={handleLocalFilterChange}
                        disabled={loading}
                        placeholder="200"
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={4} md={2}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Level"
                        name="level"
                        value={localFilters.level}
                        onChange={handleSelectChange}
                        select
                        disabled={loading}
                        variant="outlined"
                        sx={{
                            minWidth: '100px'
                        }}
                    >
                        <MenuItem value="">All Levels</MenuItem>
                        <MenuItem value="info">Info</MenuItem>
                        <MenuItem value="warning">Warning</MenuItem>
                        <MenuItem value="error">Error</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4} md={2}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Role"
                        name="role"
                        value={localFilters.role}
                        onChange={handleSelectChange}
                        select
                        disabled={loading}
                        variant="outlined"
                        sx={{
                            minWidth: '100px'
                        }}
                    >
                        <MenuItem value="">All Roles</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="viewer">Viewer</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={8} md={3}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Endpoint"
                        name="endpoint"
                        value={localFilters.endpoint}
                        onChange={handleLocalFilterChange}
                        disabled={loading}
                        placeholder="/api/users"
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={4} md={1}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClearFilters}
                        disabled={!hasActiveFilters || loading}
                        startIcon={<ClearIcon sx={{ fontSize: '1rem' }} />}
                        fullWidth
                        sx={{
                            textTransform: 'none',
                            color: '#6b7280',
                            borderColor: '#d1d5db',
                            fontSize: '0.9rem',
                            height: '40px',
                            '&:hover': {
                                backgroundColor: '#f3f4f6',
                                borderColor: '#9ca3af'
                            }
                        }}
                    >
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ApiLogsFilters;
