import React from 'react';
import { Button } from '@mui/material';

const CustomButton = React.forwardRef(({ children, onClick, variant = 'contained', color = 'primary', ...props }, ref) => {
    return (
        <Button
        ref={ref}
        variant={variant}
        color={color}
        onClick={onClick}
        {...props}
        >
            {children}
        </Button>
    );
});

CustomButton.displayName = 'CustomButton';

export default CustomButton;