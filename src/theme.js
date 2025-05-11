import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6', // Steel Blue
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F97316', // Orange
      light: '#FB923C',
      dark: '#EA580C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F9FAFB', // Lightest Gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
    },
    neutral: {
      main: '#D1D5DB', // Light Gray
      light: '#E5E7EB',
      dark: '#9CA3AF',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#4b5563',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 500,
          '&:hover': {
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          border: '1px solid #F3F4F6',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          color: '#111827',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          borderBottom: '1px solid #F3F4F6',
        },
      },
    },
  },
});

export default theme;
