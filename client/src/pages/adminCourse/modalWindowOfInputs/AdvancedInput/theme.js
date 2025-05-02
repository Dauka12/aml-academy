import { createTheme } from '@mui/material/styles';

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
    error: {
      main: '#f44336',
      light: '#f88078',
    },
    background: {
      default: '#fff',
      paper: '#fff',
      neutral: '#f5f5f5',
    },
    text: {
      primary: '#000000de',
      secondary: '#00000099',
      disabled: '#00000061',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#374761',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          },
        },
        containedPrimary: {
          backgroundColor: '#6390d8',
          '&:hover': {
            backgroundColor: '#8eb3ee',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 6,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          fontSize: '0.7rem',
        },
      },
    },
  },
});
