import { useState, useEffect } from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ptBRLocale from 'date-fns/locale/pt-BR';

import contract from '../services/contract';

function Issue(){
  const [studentName, setStudentName] = useState('');
  const [studentCPF, setStudentCPF] = useState('');
  const [studentRGNumber, setStudentRGNumber] = useState('');
  const [studentRGAgency, setStudentRGAgency] = useState('');
  const [studentRGUF, setStudentRGUF] = useState('');
  const [studentNationality, setStudentNationality] = useState('');
  const [studentBirthplace, setStudentBirthplace] = useState('');
  const [studentBirthDate, setStudentBirthDate] = useState(null);
  const [degreeNumber, setDegreeNumber] = useState('');
  const [degreeRegister, setDegreeRegister] = useState('');
  const [degreeProcess, setDegreeProcess] = useState('');
  const [degreeCompletionDate, setDegreeCompletionDate] = useState(null);
  const [degreeGraduationDate, setDegreeGraduationDate] = useState(null);
  const [degreeRegistrationDate, setDegreeRegistrationDate] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseSelectedId, setCourseSelectedId] = useState('');

  async function updateCourses(){
    const courses = await contract.getCourses();
    setCourses(courses);
    setCourseSelectedId(courses[0].id);
  }

  function onClickNewDegree(){
    contract.addNewDegree(
      studentName,
      studentCPF,
      studentRGNumber,
      studentRGAgency,
      studentRGUF,
      studentNationality,
      studentBirthplace,
      studentBirthDate,
      degreeNumber,
      degreeRegister,
      degreeProcess,
      degreeCompletionDate,
      degreeGraduationDate,
      degreeRegistrationDate,
      courseSelectedId,
    );
  }

  useEffect(() => {
    updateCourses();
  }, [])

  return(
    <>
      <Divider textAlign="left" sx={{mt: 4}}>Estudante</Divider>
      <Grid container sx={{mt: -1}} spacing={2}>
        <Grid item xs={8}>
          <TextField 
            label="Nome" 
            placeholder="Nome completo do estudante"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            variant="outlined" 
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField 
            label="CPF" 
            placeholder="CPF do estudante"
            value={studentCPF}
            onChange={(e) => setStudentCPF(e.target.value)}
            variant="outlined" 
            fullWidth
          />
        </Grid>

        {/* Estudante linha 2 */}

        <Grid item xs={4}>
          <TextField 
            label="RG" 
            placeholder="Numero do RG"
            value={studentRGNumber}
            onChange={(e) => setStudentRGNumber(e.target.value)}
            variant="outlined" 
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField 
            label="Org??o Expedidor" 
            placeholder="Org??o expedidor do RG"
            value={studentRGAgency}
            onChange={(e) => setStudentRGAgency(e.target.value)}
            variant="outlined" 
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField 
            label="UF de Emiss??o" 
            placeholder="UF de emiss??o do RG"
            value={studentRGUF}
            onChange={(e) => setStudentRGUF(e.target.value)}
            variant="outlined" 
            fullWidth
          />
        </Grid>

        {/* Estudante linha 3 */}

        <Grid item xs={4}>
          <TextField 
            label="Nacionalidade" 
            placeholder="Nacionalidade do estudante"
            value={studentNationality}
            onChange={(e) => setStudentNationality(e.target.value)}
            variant="outlined" 
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField 
            label="Naturalidade" 
            placeholder="Local de nascimento"
            value={studentBirthplace}
            onChange={(e) => setStudentBirthplace(e.target.value)}
            variant="outlined" 
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBRLocale}>
            <DatePicker
              disableFuture
              label="Data de Nascimento"
              openTo="year"
              minDate={new Date('1900-01-01')}
              value={studentBirthDate}
              onChange={setStudentBirthDate}
              renderInput={(params) =>  <TextField {...params} fullWidth/>}
          />
          </LocalizationProvider>
        </Grid>

      </Grid>
      
      <Divider textAlign="left" sx={{mt: 4}}>Diploma</Divider>

      <Grid container sx={{mt: -1}} spacing={2}>
        <Grid item xs={4}>
            <TextField 
              label="N??mero" 
              placeholder="N??mero do diploma"
              value={degreeNumber}
              onChange={(e) => setDegreeNumber(e.target.value)}
              variant="outlined" 
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
          <TextField 
            label="Registro" 
            placeholder="N??mero do registro"
            value={degreeRegister}
            onChange={(e) => setDegreeRegister(e.target.value)}
            variant="outlined" 
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField 
            label="Processo" 
            placeholder="N??mero do processo"
            value={degreeProcess}
            onChange={(e) => setDegreeProcess(e.target.value)}
            variant="outlined" 
            fullWidth
          />
        </Grid>

        {/* Diploma linha 2 */}

        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBRLocale}>
            <DatePicker
              disableFuture
              label="Conclus??o do Curso"
              openTo="year"
              minDate={new Date('1900-01-01')}
              value={degreeCompletionDate}
              onChange={setDegreeCompletionDate}
              renderInput={(params) =>  <TextField {...params} fullWidth/>}
          />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBRLocale}>
            <DatePicker
              disableFuture
              label="Cola????o de Grau"
              openTo="year"
              minDate={new Date('1900-01-01')}
              value={degreeGraduationDate}
              onChange={setDegreeGraduationDate}
              renderInput={(params) =>  <TextField {...params} fullWidth/>}
          />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBRLocale}>
            <DatePicker
              disableFuture
              label="Registro do Diploma"
              openTo="year"
              minDate={new Date('1900-01-01')}
              value={degreeRegistrationDate}
              onChange={setDegreeRegistrationDate}
              renderInput={(params) =>  <TextField {...params} fullWidth/>}
          />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
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
      
      <Grid container sx={{mt: 1, flexDirection: "row-reverse"}}>
        <Button variant="text" onClick={onClickNewDegree}>Cadastrar</Button>
      </Grid>
    </>
  )
}

export default Issue;