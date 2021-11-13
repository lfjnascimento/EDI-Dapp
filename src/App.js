import { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link as RouterLink,
} from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';

import metamask from './services/metamask';
import Admin from './pages/Admin/Admin';
import Issue from './pages/Issue';
import View from './pages/View';

function App() {
  const [userAcc, setUserAcc] = useState('');
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [disableConnectBtn, setDisableConnectBtn] = useState(false);

  const pathname = window.location.pathname;
  const showBody = isUserLogged || (pathname !== '/admin' && pathname !== '/issue');

  function login(userAcc){
    setUserAcc(userAcc);
    setIsUserLogged(true);
  }

  function logout(){
    metamask.disconnect();
    setUserAcc('');
    setIsUserLogged(false);
  }

  async function requesteUserAcc(){
    setDisableConnectBtn(true);
    login(await metamask.requestUserAcc());
    setDisableConnectBtn(false);
  }

  useEffect(() => {
    metamask.getUserAcc().then((acc) => {
      if(acc)
        login(acc);
    });
  }, [])

  return (
    <>
    <Router>

      <AppBar position="static">
        <Toolbar >
        <Chip
          label={(isUserLogged)? userAcc: 'Conectar MetaMask'}
          disabled={disableConnectBtn}
          onClick={(!isUserLogged)? requesteUserAcc: null}
          onDelete={(isUserLogged)? logout : null}
          sx={{color: 'primary.contrastText', backgroundColor: '#c8191e'}}
        />

        <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
          <Link component={RouterLink} to="/admin" color="background.default" underline="none" sx={{m: 1}}>
            Admin/
          </Link>
          <Link component={RouterLink} to="/issue" color="background.default" underline="none" sx={{m: 1}}>
            Emitir/
          </Link>
          <Link component={RouterLink} to="/view" color="background.default" underline="none" sx={{m: 1}}>
            Consultar/
          </Link>
        </Box>
        </Toolbar>
      </AppBar>
      
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        {
          showBody &&
          <Box 
            component="main" 
            sx={{
              width: '100%', 
              maxWidth: '800px'
            }}
          >
            
            <Routes>
              <Route path='/' element={<View/>} />
              <Route path='/admin' element={<Admin/>} />
              <Route path='/issue' element={<Issue/>} />
              <Route path='/view' element={<View/>} />
              <Route path='*' element={<Navigate to="/"/>} />
            </Routes>
          </Box>
        }
      </Box>
    </Router>
    </>
  );
}

export default App;
