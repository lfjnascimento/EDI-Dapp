import { useState, useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import contract from '../../services/contract';

function Issuer(){
  const [issuer, setIssuer] = useState('') ;
  const [issuers, setIssuers] = useState([]);

  function onChangeIssuer(e){
    setIssuer(e.target.value);
  }

  async function updateIssuers(){
    const issuers = await contract.getIssuers();
    setIssuers(issuers);
  }

  async function onClickNewIssuer(){
    if(issuer.trim().length > 0){
      const txResponse = await contract.addNewIssuer(issuer);
      setIssuer('');
      await txResponse.wait();
      updateIssuers();
    }
  }

  async function onClickDeleteIssuer(issuer){
    const txResponse = await contract.deleteIssuer(issuer);
    await txResponse.wait();
    updateIssuers();
  }
  
  useEffect(() => {
    updateIssuers();
  }, [])

  return (
    <>
      <Accordion elevation={6} > 
      <AccordionSummary>
        <Typography>Cadastrar Novo Emissor</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Box
          component="form"
          autoComplete="off"
          noValidate
          sx={{display:'flex', '& > :not(style)': { m: 1}}}
        >
          <TextField 
            label="Emissor" 
            value={issuer}
            onChange={onChangeIssuer}
            variant="outlined" 
            placeholder="Endereço do emissor"
            id="isser"
            sx={{width:'100%'}}
          />
        </Box>
      </AccordionDetails>

      <AccordionActions>
        <Button variant="text" onClick={onClickNewIssuer}>Cadastrar</Button>
      </AccordionActions>
    </Accordion>

    <TableContainer component={Paper} elevation={2} sx={{ mt: 5 }} hidden={issuers.length === 0}>
      <Table size="small">
        <TableHead> 
          <TableRow>
            <TableCell>Endereço do Emissor</TableCell>
            <TableCell align="right">Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issuers.map((issuer) => (
            <TableRow key={issuer}> 
              <TableCell component="th" scope="row">
                {issuer}
              </TableCell>

              <TableCell align="right">
                <IconButton onClick={() => onClickDeleteIssuer(issuer)}>
                  <HighlightOffIcon color="error"/>
                </IconButton>
              </TableCell>
            </TableRow>
            
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default Issuer;