import { useState, useEffect } from 'react';

import { jsPDF } from "jspdf";

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

import contract from '../services/contract';

function View(){
  const [studentCPF, setStudentCPF] = useState('');
  const [degreeID, setdegreeID] = useState('');
  const [courses, setCourses] = useState([]);
  const [courseSelectedId, setCourseSelectedId] = useState('');
  const [degree, setDegree] = useState([]);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  async function updateCourses(){
    const courses = await contract.getCourses();
    setCourses(courses);
    setCourseSelectedId(courses[0].id);
  }

  async function onClickGetDegree(){
    const degree = await contract.GetDegree(degreeID, studentCPF, courseSelectedId);

    setDegree(degree);
    if(!degree.is_valid) setOpenSnackbar(true);
  }

  function onCloseSnackbar(){
    setOpenSnackbar(false);
  }

  useEffect(() => {
    updateCourses();
  }, []);

  return (
    <>
      <Snackbar
        message="Não foi encontrado diploma válido"
        open={openSnackbar}
        onClose={onCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />

      <Divider textAlign="left" sx={{mt: 4}}>Consultar Diploma</Divider>
      
      <Grid container sx={{mt: 1}} spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="CPF" 
            placeholder="CPF do diplomado"
            disabled={degreeID.length > 0}
            value={studentCPF}
            onChange={(e) => setStudentCPF(e.target.value)}
            variant="outlined" 
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField 
            label="Curso"
            value={courseSelectedId}
            onChange={(e) => setCourseSelectedId(e.target.value)}
            fullWidth
            select
          >
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>        
      </Grid>

      <Divider sx={{mt: 1, mb: 1}}>ou</Divider>

      <TextField 
        label="ID" 
        placeholder="ID do diploma"
        disabled={studentCPF.length > 0}
        value={degreeID}
        onChange={(e) => setdegreeID(e.target.value)}
        variant="outlined" 
        fullWidth
      />

      <Grid container sx={{mt: 2, flexDirection: "row-reverse"}}>
        <Button 
          variant="text" 
          onClick={onClickGetDegree} 
          disabled={studentCPF.length === 0 && degreeID.length === 0}
        >
          Consultar
        </Button>
      </Grid>
      
      <Box hidden={!degree.is_valid}>
        <Divider textAlign="left" sx={{mt: 4, mb: 2}}>Dados do diploma</Divider>
      
        <Grid container spacing={2}> 
          <Grid item xs={6}>
            <TextField
              label="Nome"
              value={degree.student?.name || ''}
              variant="standard"
              InputProps={{readOnly: true}}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Curso"
              value={(courses.find((c) => c.id === degree.course_ID)?.name) || ''}
              variant="standard"
              InputProps={{readOnly: true}}
              fullWidth
            />
          </Grid>
          
          {/* Linha 2 */}

          <Grid item xs={4}>
            <TextField
              label="Título"
              value={(courses.find((c) => c.id === degree.course_ID)?.degreeType) || ''}
              variant="standard"
              InputProps={{readOnly: true}}
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Data de graduação"
              value={new Date(degree.graduation_date?.toNumber())?.toLocaleDateString() || ''}
              variant="standard"
              InputProps={{readOnly: true}}
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Data de emissão"
              value={new Date(degree.issue_date?.toNumber()*1000)?.toLocaleDateString() || ''}
              variant="standard"
              InputProps={{readOnly: true}}
              fullWidth
            />
          </Grid>

          {/* Linha 3 */}

          <Grid item xs={4}>
            <TextField
              label="Número do diploma"
              value={degree.number || ''}
              variant="standard"
              InputProps={{readOnly: true}}
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Número do registro"
              value={degree.register_number || ''}
              variant="standard"
              InputProps={{readOnly: true}}
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Número do processo"
              value={degree.process_number || ''}
              variant="standard"
              InputProps={{readOnly: true}}
              fullWidth
            />
          </Grid>
        </Grid>       
      </Box>
    </>
  )
}

export default View
