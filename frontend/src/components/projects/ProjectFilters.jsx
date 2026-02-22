import React from 'react';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import { GridView as GridViewIcon, ListAlt as ListIcon } from '@mui/icons-material';

const ProjectFilters = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    viewMode,
    setViewMode
}) => {
    return (
        <Box sx={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <TextField
                size="small"
                label="Search Projects"
                placeholder="Search by name, description, or tech..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '0.375rem',
                        height: '40px'
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '8px 12px'
                    }
                }}
            />

            <FormControl size="small" sx={{ minWidth: '180px', height: '40px' }}>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                    value={statusFilter}
                    label="Filter by Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{
                        borderRadius: '0.375rem',
                        height: '40px'
                    }}
                >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="planning">Planning</MenuItem>
                    <MenuItem value="testing">Testing</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="live">Live</MenuItem>
                    <MenuItem value="on_hold">On Hold</MenuItem>
                    <MenuItem value="archived">Archived</MenuItem>
                </Select>
            </FormControl>

            {/* View Toggle */}
            <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(event, newMode) => {
                    if (newMode !== null) {
                        setViewMode(newMode);
                    }
                }}
                sx={{
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    padding: '0.25rem',
                    height: '40px'
                }}
            >
                <ToggleButton
                    value="grid"
                    aria-label="grid view"
                    sx={{
                        padding: '0.5rem 0.75rem',
                        '&.Mui-selected': {
                            backgroundColor: '#ffffff',
                            color: '#3b82f6'
                        }
                    }}
                >
                    <GridViewIcon sx={{ fontSize: '1.2rem' }} />
                </ToggleButton>
                <ToggleButton
                    value="list"
                    aria-label="list view"
                    sx={{
                        padding: '0.5rem 0.75rem',
                        '&.Mui-selected': {
                            backgroundColor: '#ffffff',
                            color: '#3b82f6'
                        }
                    }}
                >
                    <ListIcon sx={{ fontSize: '1.2rem' }} />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default ProjectFilters;
