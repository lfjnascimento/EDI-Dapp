import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider  } from '@mui/material/styles';

import App from './App';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type=number] {
          -moz-appearance: textfield;
        }
      `,
    },
  },
  palette: {
    primary: {
      main: '#359830'
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <App />
    </ThemeProvider >
  </React.StrictMode>,
  document.getElementById('root')
);

