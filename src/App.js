import { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Chip from '@mui/material/Chip';

import metamask from './services/metamask';

function App() {
  const [userAcc, setUserAcc] = useState('');
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [disableConnectBtn, setDisableConnectBtn] = useState(false);

  function login(userAcc){
    setUserAcc(userAcc);
    setIsUserLogged(true);
  }

  function logout(){
    setUserAcc('');
    setIsUserLogged(false);
  }

  async function requesteUserAcc(){
    setDisableConnectBtn(true);
    login(await metamask.requestUserAcc());
    setDisableConnectBtn(false);
  }

  useEffect(() =>{
    metamask.getUserAcc().then((acc) => {
      if(acc)
        login(acc);
    });
  }, [])

  return (
    <> 
    <AppBar position="static">
      <Toolbar >
      <Chip
        label={(isUserLogged)? userAcc: 'Conectar MetaMask'}
        disabled={disableConnectBtn}
        onClick={(!isUserLogged)? requesteUserAcc: null}
        onDelete={(isUserLogged)? logout : null}
        sx={{color: 'primary.contrastText', backgroundColor: '#c8191e'}}
      />
      </Toolbar>
    </AppBar>
    
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Box 
      component="main" 
      sx={{
        width: '100%', 
        maxWidth: '800px',
        display: () => (isUserLogged)? 'block' : 'none',
        }}>

        site body

      </Box>
    </Box>
    </>
  );
}

export default App;
