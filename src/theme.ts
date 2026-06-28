import { createTheme, Theme } from '@mui/material/styles';

const fontStack = '"Inter", "Segoe UI", system-ui, sans-serif';
const displayFont = '"Sora", "Inter", sans-serif';

const sharedTypography = {
  fontFamily: fontStack,
  h1: { fontFamily: displayFont, fontWeight: 700 },
  h2: { fontFamily: displayFont, fontWeight: 700 },
  h3: { fontFamily: displayFont, fontWeight: 600 },
  h4: { fontFamily: displayFont, fontWeight: 600 },
  h5: { fontFamily: displayFont, fontWeight: 600 },
  h6: { fontFamily: displayFont, fontWeight: 600 },
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
    action: {
      hover: 'rgba(167,139,250,0.08)',
      selected: 'rgba(167,139,250,0.14)',
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
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1c0d38',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(167,139,250,0.08)',
        },
        head: {
          color: '#a78bfa',
          fontWeight: 600,
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
        containedPrimary: {
          background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
          boxShadow: '0 2px 12px rgba(124,58,237,0.4)',
          '&:hover': { boxShadow: '0 4px 20px rgba(124,58,237,0.5)' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': { borderColor: 'rgba(167,139,250,0.2)' },
            '&:hover fieldset': { borderColor: 'rgba(167,139,250,0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
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
          boxShadow: 'none',
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
    action: {
      hover: 'rgba(109,40,217,0.06)',
      selected: 'rgba(109,40,217,0.1)',
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
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#6d28d9',
          fontWeight: 600,
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
        containedPrimary: {
          background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
          boxShadow: '0 2px 12px rgba(109,40,217,0.3)',
          color: '#fff',
          '&:hover': { boxShadow: '0 4px 20px rgba(109,40,217,0.4)' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': { borderColor: 'rgba(109,40,217,0.2)' },
            '&:hover fieldset': { borderColor: 'rgba(109,40,217,0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#6d28d9' },
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
          boxShadow: 'none',
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
  },
});
