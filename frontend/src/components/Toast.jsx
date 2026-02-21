import React, { useEffect, createContext, useContext, useState } from 'react';
import { Alert, Snackbar, Slide } from '@mui/material';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    const showToast = (message, severity = 'info') => {
        setToast({
        open: true,
        message,
        severity,
        });
    };

    const hideToast = () => {
        setToast({
        open: false,
        message: '',
        severity: 'info',
        });
    };

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
        {children}
        <Toast
            open={toast.open}
            onClose={hideToast}
            message={toast.message}
            severity={toast.severity}
        />
        </ToastContext.Provider>
    );
};

const Toast = ({
    open,
    onClose,
    message,
    severity = 'info',
    autoHideDuration = 4000,
    anchorOrigin = { vertical: 'top', horizontal: 'right' },
    ...props
    }) => {
    useEffect(() => {
        if (open && autoHideDuration > 0) {
        const timer = setTimeout(() => {
            onClose();
        }, autoHideDuration);

        return () => clearTimeout(timer);
        }
    }, [open, onClose, autoHideDuration]);

    const SlideTransition = (props) => {
        return <Slide {...props} direction="left" />;
    };

    const handleClose = (event, reason) => {
        onClose();
    };

    if (!open) return null;

    return (
        <Snackbar
        open={true}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        TransitionComponent={SlideTransition}
        autoHideDuration={null}
        {...props}
        >
        <Alert
            onClose={handleClose}
            severity={severity}
            variant="filled"
            sx={{
            minWidth: 300,
            boxShadow: 3,
            '& .MuiAlert-icon': {
                fontSize: '1.2rem',
            },
            '& .MuiAlert-closeIcon': {
                cursor: 'pointer',
            }
            }}
        >
            {message}
        </Alert>
        </Snackbar>
    );
};

export default Toast;