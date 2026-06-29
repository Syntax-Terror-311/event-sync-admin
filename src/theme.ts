import { createTheme, Theme } from '@mui/material/styles';

const fontStack = '"Inter", "Segoe UI", system-ui, sans-serif';
const displayFont = '"Sora", "Inter", sans-serif';

const sharedTypography = {
  fontFamily: fontStack,
  h1: { fontFamily: displayFont, fontWeight: 700, letterSpacing: '-0.02em' },
  h2: { fontFamily: displayFont, fontWeight: 700, letterSpacing: '-0.01em' },
  h3: { fontFamily: displayFont, fontWeight: 600 },
  h4: { fontFamily: displayFont, fontWeight: 600 },
  h5: { fontFamily: displayFont, fontWeight: 600 },
  h6: { fontFamily: displayFont, fontWeight: 600 },
  body1: { fontWeight: 400, lineHeight: 1.6 },
  body2: { fontWeight: 400, lineHeight: 1.5 },
  button: { fontFamily: fontStack, fontWeight: 500, textTransform: 'none' as const, letterSpacing: '0.01em' },
};

const sharedShape = { borderRadius: 12 };

export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#a78bfa', light: '#c4b5fd', dark: '#7c3aed' },
    secondary: { main: '#7c3aed' },
    background: { default: '#0f0520', paper: '#1c0d38' },
    text: { primary: '#ede9fe', secondary: '#a78bfa' },
    divider: 'rgba(167,139,250,0.12)',
    success: { main: '#10b981', light: '#6ee7b7', dark: '#047857' },
    warning: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
    error: { main: '#ef4444', light: '#fca5a5', dark: '#991b1b' },
    info: { main: '#3b82f6', light: '#93c5fd', dark: '#1e40af' },
    action: {
      hover: 'rgba(167,139,250,0.08)',
      selected: 'rgba(167,139,250,0.14)',
      disabled: 'rgba(167,139,250,0.5)',
    },
  },
  typography: sharedTypography,
  shape: sharedShape,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1c0d38',
          border: '1px solid rgba(167,139,250,0.12)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: 'rgba(167,139,250,0.25)',
            boxShadow: '0 8px 24px rgba(124,58,237,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1c0d38',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(167,139,250,0.08)',
          padding: '16px',
        },
        head: {
          color: '#a78bfa',
          fontWeight: 600,
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          backgroundColor: 'rgba(124,58,237,0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { 
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
          boxShadow: '0 4px 15px rgba(124,58,237,0.3)',
          '&:hover': { 
            boxShadow: '0 8px 25px rgba(124,58,237,0.5)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(167,139,250,0.3)',
          color: '#a78bfa',
          '&:hover': {
            backgroundColor: 'rgba(124,58,237,0.1)',
            borderColor: '#a78bfa',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': { 
              borderColor: 'rgba(167,139,250,0.2)',
              borderWidth: '1.5px',
            },
            '&:hover fieldset': { 
              borderColor: 'rgba(167,139,250,0.4)',
            },
            '&.Mui-focused fieldset': { 
              borderColor: '#a78bfa',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(167,139,250,0.6)',
            '&.Mui-focused': {
              color: '#a78bfa',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#120728',
          backgroundImage: 'none',
          borderBottom: '1px solid rgba(167,139,250,0.1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#120728',
          borderRight: '1px solid rgba(167,139,250,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
        filled: {
          backgroundColor: 'rgba(124,58,237,0.1)',
          color: '#a78bfa',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: '#1c0d38',
          border: '1px solid rgba(167,139,250,0.1)',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
        },
      },
    },
  },
});

export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6d28d9', light: '#8b5cf6', dark: '#4c1d95' },
    secondary: { main: '#8b5cf6' },
    background: { default: '#f5f0ff', paper: '#ffffff' },
    text: { primary: '#2e1065', secondary: '#6d28d9' },
    divider: 'rgba(109,40,217,0.1)',
    success: { main: '#10b981', light: '#6ee7b7', dark: '#047857' },
    warning: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
    error: { main: '#ef4444', light: '#fca5a5', dark: '#991b1b' },
    info: { main: '#3b82f6', light: '#93c5fd', dark: '#1e40af' },
    action: {
      hover: 'rgba(109,40,217,0.06)',
      selected: 'rgba(109,40,217,0.1)',
      disabled: 'rgba(109,40,217,0.5)',
    },
  },
  typography: sharedTypography,
  shape: sharedShape,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(109,40,217,0.1)',
          boxShadow: '0 1px 4px rgba(109,40,217,0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: 'rgba(109,40,217,0.2)',
            boxShadow: '0 8px 24px rgba(109,40,217,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(109,40,217,0.08)',
          padding: '16px',
        },
        head: {
          color: '#6d28d9',
          fontWeight: 600,
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          backgroundColor: 'rgba(109,40,217,0.04)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { 
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
          boxShadow: '0 4px 15px rgba(109,40,217,0.2)',
          color: '#fff',
          '&:hover': { 
            boxShadow: '0 8px 25px rgba(109,40,217,0.3)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(109,40,217,0.3)',
          color: '#6d28d9',
          '&:hover': {
            backgroundColor: 'rgba(109,40,217,0.05)',
            borderColor: '#6d28d9',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': { 
              borderColor: 'rgba(109,40,217,0.2)',
              borderWidth: '1.5px',
            },
            '&:hover fieldset': { 
              borderColor: 'rgba(109,40,217,0.4)',
            },
            '&.Mui-focused fieldset': { 
              borderColor: '#6d28d9',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(109,40,217,0.6)',
            '&.Mui-focused': {
              color: '#6d28d9',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          backgroundImage: 'none',
          borderBottom: '1px solid rgba(109,40,217,0.1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          color: '#2e1065',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ede9fe',
          borderRight: '1px solid rgba(109,40,217,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
        filled: {
          backgroundColor: 'rgba(109,40,217,0.1)',
          color: '#6d28d9',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(109,40,217,0.1)',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
        },
      },
    },
  },
});
