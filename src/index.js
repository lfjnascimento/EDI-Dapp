import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider  } from '@mui/material/styles';

import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#359830'
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider >
  </React.StrictMode>,
  document.getElementById('root')
);

