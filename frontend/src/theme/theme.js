import { createTheme } from '@mui/material/styles';
import colors from './color';
import typography from './font';

const theme = createTheme({
    palette: colors,
    typography,
});

export default theme;
