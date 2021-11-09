import { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Course from './Course';
import Issuer from './Issuer';

function Admin(){
  const [tabIndex, setTabIndex] = useState(0);

  function handleTabChange(event, newValue){
    setTabIndex(newValue);
  }

  return(
    <>
      <Tabs value={tabIndex} onChange={handleTabChange} centered sx={{m: 2}}>
        <Tab label="Cursos" value={0}/>
        <Tab label="Emissores" value={1}/>
      </Tabs>

      {(tabIndex === 0)? <Course /> : <Issuer/>}
    </>
  )
}

export default Admin;