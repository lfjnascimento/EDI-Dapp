import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@mui/material/CssBaseline';

import App from './App';
import Admin from './pages/Admin';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Admin />
  </React.StrictMode>,
  document.getElementById('root')
);

