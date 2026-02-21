import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Box
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

const DeleteConfirmationModal = ({ open, onClose, project, onConfirmDelete }) => {
    const handleConfirm = () => {
        console.log('Delete project:', project);
        onConfirmDelete(project);
        onClose();
    };

    if (!project) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
                }
            }}
        >
            <DialogTitle>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: '#1f2937'
                    }}
                >
                    Delete Project
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ padding: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        paddingTop: '0.5rem'
                    }}
                >
                    <WarningIcon
                        sx={{
                            fontSize: '1.75rem',
                            color: '#ef4444',
                            flexShrink: 0,
                            marginTop: '0.25rem'
                        }}
                    />
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '0.95rem',
                                color: '#1f2937',
                                marginBottom: '0.5rem'
                            }}
                        >
                            Are you sure you want to delete <strong>{project.title}</strong>?
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '0.85rem',
                                color: '#6b7280'
                            }}
                        >
                            This action cannot be undone. The project and all its associated data will be permanently deleted.
                        </Typography>
                    </Box>
                </Box>
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
                    onClick={onClose}
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
                    onClick={handleConfirm}
                    variant="contained"
                    sx={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                            backgroundColor: '#dc2626'
                        }
                    }}
                >
                    Delete Project
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationModal;
