import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Typography,
    FormControlLabel,
    Switch,
    Alert
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const AddProjectModal = ({ open, onClose, onAddProject }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tech_stack: [],
        repo_url: '',
        status: 'planning',
        is_public: false
    });

    const [techInput, setTechInput] = useState('');
    const [errors, setErrors] = useState({});

    const statusOptions = ['planning', 'testing', 'completed', 'live', 'on_hold', 'archived'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleToggleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            is_public: e.target.checked
        }));
    };

    const handleAddTech = (e) => {
        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();
            const newTech = techInput.trim();
            if (!formData.tech_stack.includes(newTech)) {
                setFormData(prev => ({
                    ...prev,
                    tech_stack: [...prev.tech_stack, newTech]
                }));
                setTechInput('');
                if (errors.tech_stack) {
                    setErrors(prev => ({
                        ...prev,
                        tech_stack: ''
                    }));
                }
            }
        }
    };

    const handleRemoveTech = (tech) => {
        setFormData(prev => ({
            ...prev,
            tech_stack: prev.tech_stack.filter(t => t !== tech)
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (formData.tech_stack.length === 0) {
            newErrors.tech_stack = 'Please add at least one technology';
        }
        if (!formData.repo_url.trim()) {
            newErrors.repo_url = 'Repository URL is required';
        } else if (!/^https?:\/\/.+/.test(formData.repo_url)) {
            newErrors.repo_url = 'Please enter a valid URL starting with http:// or https://';
        }
        if (!formData.status) {
            newErrors.status = 'Status is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const projectData = {
                ...formData,
                tech_stack: formData.tech_stack.join(', ')
            };
            console.log('New Project Data:', projectData);
            onAddProject(projectData);
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({
            title: '',
            description: '',
            tech_stack: [],
            repo_url: '',
            status: 'planning',
            is_public: false
        });
        setTechInput('');
        setErrors({});
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
                }
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem',
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: '#fafbfc'
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: '#1f2937'
                    }}
                >
                    Add New Project
                </Typography>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        color: '#6b7280',
                        '&:hover': {
                            backgroundColor: '#f3f4f6'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ padding: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                <Stack spacing={1.5} sx={{ paddingTop: '1rem' }}>
                    <TextField
                        label="Project Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                        error={!!errors.title}
                        helperText={errors.title}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '0.375rem'
                            }
                        }}
                    />

                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        fullWidth
                        multiline
                        rows={4}
                        size="small"
                        error={!!errors.description}
                        helperText={errors.description}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '0.375rem'
                            }
                        }}
                    />

                    <Box>
                        <TextField
                            label="Add Technology (press Enter)"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyPress={handleAddTech}
                            fullWidth
                            size="small"
                            error={!!errors.tech_stack && formData.tech_stack.length === 0}
                            helperText={errors.tech_stack}
                            variant="outlined"
                            placeholder="e.g., React.js"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '0.375rem'
                                }
                            }}
                        />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                            {formData.tech_stack.map((tech) => (
                                <Chip
                                    key={tech}
                                    label={tech}
                                    onDelete={() => handleRemoveTech(tech)}
                                    variant="outlined"
                                    sx={{
                                        fontSize: '0.75rem',
                                        height: '24px',
                                        borderColor: '#e5e7eb',
                                        backgroundColor: '#f9fafb',
                                        color: '#4b5563'
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    <FormControl fullWidth size="small" error={!!errors.status}>
                        <InputLabel
                            sx={{
                                fontSize: '0.9rem'
                            }}
                        >
                            Status
                        </InputLabel>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            label="Status"
                            sx={{
                                borderRadius: '0.375rem'
                            }}
                        >
                            {statusOptions.map(status => (
                                <MenuItem key={status} value={status}>
                                    {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Repository URL"
                        name="repo_url"
                        value={formData.repo_url}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                        error={!!errors.repo_url}
                        helperText={errors.repo_url || 'https://github.com/user/repo'}
                        variant="outlined"
                        placeholder="https://github.com/user/repo"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '0.375rem'
                            }
                        }}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={formData.is_public}
                                onChange={handleToggleChange}
                                size="small"
                            />
                        }
                        label={
                            <Typography sx={{ fontSize: '0.9rem', color: '#6b7280' }}>
                                {formData.is_public ? 'Public' : 'Private'}
                            </Typography>
                        }
                        sx={{
                            backgroundColor: '#f9fafb',
                            padding: '0.75rem',
                            borderRadius: '0.375rem',
                            border: '1px solid #e5e7eb',
                            margin: 0
                        }}
                    />
                </Stack>
            </DialogContent>

            <DialogActions
                sx={{
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid #e5e7eb',
                    backgroundColor: '#fafbfc',
                    gap: '0.75rem'
                }}
            >
                <Button
                    onClick={handleClose}
                    variant="text"
                    sx={{
                        color: '#6b7280',
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                            backgroundColor: '#f3f4f6'
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                            backgroundColor: '#2563eb'
                        }
                    }}
                >
                    Add Project
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProjectModal;
