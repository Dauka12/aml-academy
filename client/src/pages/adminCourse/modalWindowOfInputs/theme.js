import { createTheme } from '@mui/material/styles';

export const modalTheme = createTheme({
    palette: {
        primary: {
            main: '#6390d8',
            light: '#8eb3ee',
            lighter: '#e6eefb',
        },
        secondary: {
            main: '#374761',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
            neutral: '#f5f5f5',
        },
        text: {
            primary: '#000000de',
            secondary: '#00000099',
        },
    },
    typography: {
        fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif',
        h5: {
            fontWeight: 700,
            fontSize: '24px',
            color: '#374761',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 5,
                },
                contained: {
                    backgroundColor: '#6390d8',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#8eb3ee',
                    },
                },
                outlined: {
                    color: '#00000099',
                    borderColor: '#e0e0e0',
                    backgroundColor: '#f5f5f5',
                    '&:hover': {
                        backgroundColor: '#e0e0e0',
                        borderColor: '#cccccc',
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 9,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 5,
                        fontSize: '13px',
                        fontFamily: '"Ubuntu", sans-serif',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: '13px',
                    fontFamily: '"Ubuntu", sans-serif',
                },
            },
        },
    },
});

export const advancedInputTheme = createTheme({
    palette: {
        primary: {
            main: '#6390d8',
            light: '#8eb3ee',
            lighter: '#e6eefb',
        },
        secondary: {
            main: '#374761',
        },
        background: {
            neutral: '#f5f7fa',
        },
    },
    typography: {
        fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif',
    },
});
