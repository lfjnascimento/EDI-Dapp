import { useState, useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import contract from '../../services/contract';

const degreeTypes = ['Tecnólogo', 'Bacharelado', 'Licenciatura', 'Mestrado', 'Doutorado', 'Pós-doutorado' ]

function Course(){
  const [name, setName] = useState('');
  const [degreeType, setDegreeType] = useState(degreeTypes[0]);
  const [courseEditing, setCourseEditing] = useState({name: '', degreeType: degreeTypes[0]});
  const [courses, setCourses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  function onChangeName(e){
    setName(e.target.value);
  }

  function onChangeNameEdit(e){
    setCourseEditing({ ...courseEditing, name: e.target.value });
  }

  function onChangeDegreeType(e){
    setDegreeType(e.target.value);
  }

  function onChangeDegreeTypeEdit(e){
    setCourseEditing({ ...courseEditing, degreeType: e.target.value });
  }

  async function updateCourses(){
    const courses = await contract.getCourses();
    setCourses(courses)
  }

  async function onClickNewCourse(){
    if(name.trim().length > 0){
      const txResponse = await contract.addNewCourse(name, degreeType);
      setName('');
      await txResponse.wait();
      updateCourses();
    }
  }

  async function onClickEditCourse(){
    const {id, name, degreeType} = courseEditing;

    if(name.trim().length > 0){
      const txResponse = await contract.editCourse(id, name, degreeType);
      setOpenDialog(false);
      setCourseEditing({name: '', degreeType: degreeTypes[0]});
      await txResponse.wait();
      updateCourses();
    }
  }

  async function onClickEditOption(id){
    const courseEditing = courses.find((course) => course.id === id);

    setCourseEditing(courseEditing)
    setOpenDialog(true);
  }

  useEffect(() => {
    updateCourses();
  }, [])


  return(
    <>
    <Accordion elevation={6} > 
      <AccordionSummary>
        <Typography>Cadastrar Novo Curso</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Box
          component="form"
          autoComplete="off"
          noValidate
          sx={{display:'flex', '& > :not(style)': { m: 1}}}
        >
          <TextField 
            label="Nome" 
            value={name}
            onChange={onChangeName}
            variant="outlined" 
            placeholder="Nome do curso"
            id="course-name"
            sx={{width:'60%'}}
          />

          <TextField 
            label="Título Conferido"
            value={degreeType}
            onChange={onChangeDegreeType}
            id="degree-type"
            select
            sx={{width:'36%'}}
          >
            {degreeTypes.map((degreeType) => (
              <MenuItem key={degreeType} value={degreeType}>
                {degreeType}
              </MenuItem>
            ))}
          </TextField>
          
        </Box>
      </AccordionDetails>

      <AccordionActions>
        <Button variant="text" onClick={onClickNewCourse}>Cadastrar</Button>
      </AccordionActions>
    </Accordion>

    <TableContainer component={Paper} elevation={2} sx={{ mt: 5 }} hidden={courses.length === 0}>
      <Table size="small">
        <TableHead> 
          <TableRow>
            <TableCell>Curso</TableCell>
            <TableCell>Título</TableCell>
            <TableCell align="right">Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}> 
              <TableCell component="th" scope="row">
                {course.name}
              </TableCell>

              <TableCell>
                {course.degreeType}
              </TableCell>

              <TableCell align="right">
                <IconButton onClick={() => onClickEditOption(course.id)}>
                  <ModeEditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} sx={{ '& .MuiDialog-paper': { width: '100%'}}}>
      <DialogTitle>Editar Curso</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          autoComplete="off"
          noValidate
          sx={{display:'flex', '& > :not(style)': { m: 1}}}
        >
          <TextField 
            label="Nome" 
            value={courseEditing.name}
            onChange={onChangeNameEdit}
            variant="outlined" 
            placeholder="Nome do curso"
            id="course-name"
            sx={{width:'80%'}}
          />

          <TextField 
            label="Título Conferido"
            value={courseEditing.degreeType}
            onChange={onChangeDegreeTypeEdit}
            id="degree-type"
            select
            sx={{width:'36%'}}
          >
            {degreeTypes.map((degreeType) => (
              <MenuItem key={degreeType} value={degreeType}>
                {degreeType}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="warning" onClick={()=> setOpenDialog(false)}>Cancelar</Button>
        <Button variant="text" onClick={onClickEditCourse}>Editar</Button>
      </DialogActions>
    </Dialog>
  </>
  )
}

export default Course;