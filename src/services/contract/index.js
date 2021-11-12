import metamask from '../metamask';

import { ethers } from 'ethers';
import ABI from './contractABI.json';

const networkName = process.env.REACT_APP_BLOCKHAIN_NETWORK
const contractAddr = process.env.REACT_APP_CONTRACT_ADDR;

let contractObj = null;

async function getContract(){
  if (!contractObj){
    const provider = await  metamask.getProvider();
    const ethersProvider = new ethers.providers.Web3Provider(provider, networkName);
    const signer =  ethersProvider.getSigner();
    contractObj = new ethers.Contract(contractAddr, ABI, signer);
  }
  
  return contractObj;
}

async function addNewCourse(name, degreeType){
  const contract = await getContract(); 
  return await contract.addCourse(name, degreeType);
}

async function editCourse(id, newName, newDegreeType){
  console.log(id, newName, newDegreeType)
  const contract = await getContract(); 
  return await contract.changeCourse(id, newName, newDegreeType);
}

async function getCourses(){
  const contract = await getContract(); 
  const courses = await contract.getCourses();
  return courses.map((course) => ({id: course.ID, name: course.name, degreeType: course.academic_degree}));
}

async function addNewIssuer(issuer){
  const contract = await getContract(); 
  return await contract.addIssuer(issuer);
}

async function getIssuers(){
  const contract = await getContract(); 
  return contract.getIssuers();
}

async function deleteIssuer(issuer){
  const contract = await getContract(); 
  return contract.removeIssuer(issuer);
}

async function getIDS(issuer){
  const contract = await getContract(); 
  return contract.getDegreeIDs();
}

async function addNewDegree(
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
  courseId,
){
  const contract = await getContract(); 
  const txResponse = await contract.createDegree(
    studentCPF,
    courseId,
    degreeNumber,
    degreeRegister,
    degreeProcess,
    degreeCompletionDate.getTime(),
    degreeGraduationDate.getTime(),
    degreeRegistrationDate.getTime(),
  );

  await txResponse.wait();
  return contract.addStudent(
    studentCPF,
    courseId,
    studentName,
    studentNationality,
    studentRGNumber,
    studentRGAgency,
    studentRGUF,
    studentBirthplace,
    studentBirthDate.getTime(),
  );
}

const contract = {
  addNewCourse,
  editCourse,
  getCourses,
  addNewIssuer,
  getIssuers,
  deleteIssuer,
  addNewDegree,
  getIDS
}
export default contract;