import React from 'react';
import { TextField } from '@mui/material';

const InputField = React.forwardRef(({ label, value, onChange, error, helperText, ...props }, ref) => {
    return (
        <TextField
        ref={ref}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        fullWidth
        {...props}
        />
    );
});

InputField.displayName = 'InputField';

export default InputField;