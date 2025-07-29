import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#175844', // Koopfon Primary
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff9800', // Turuncu tonu, vurgu için
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffc107',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#f4f6f8', // Açık gri arka plan
      paper: '#ffffff',
    },
    text: {
      primary: '#212121', // Koyu gri metin
      secondary: '#757575', // Açık gri metin
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      marginBottom: '0.8rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
      marginBottom: '0.6rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none', // Buton metinlerini küçük harf yap
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Butonlarda gölgeyi kaldır
      },
      styleOverrides: {
        root: {
          borderRadius: 8, // Daha yuvarlak köşeler
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // Beyaz AppBar
          color: '#212121', // Koyu metin
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)', // Hafif gölge
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Daha yuvarlak köşeler
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)', // Hafif gölge
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined', // Varsayılan olarak outlined TextField
        size: 'small',
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'outlined', // Varsayılan olarak outlined Select
        size: 'small',
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#e0e0e0', // Tablo başlıkları için hafif gri arka plan
          color: '#212121',
        },
      },
    },
  },
});

export default theme;