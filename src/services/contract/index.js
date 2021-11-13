import metamask from '../metamask';

import { ethers } from 'ethers';
import ABI from './contractABI.json';

const networkName = process.env.REACT_APP_BLOCKHAIN_NETWORK
const contractAddr = process.env.REACT_APP_CONTRACT_ADDR;

let contractWithSigner = null;
let contractWithoutSigner = null;

async function getContractWithSigner(){
  if (!contractWithSigner){
    const provider = await  metamask.getProvider();
    const ethersProvider = new ethers.providers.Web3Provider(provider, networkName);
    const signer =  ethersProvider.getSigner();
    contractWithSigner = new ethers.Contract(contractAddr, ABI, signer);
  }
  
  return contractWithSigner;
}

async function getContractWithoutSigner(){
  if (!contractWithoutSigner){
    const provider = await  metamask.getProvider();
    const ethersProvider = new ethers.providers.Web3Provider(provider, networkName);
    contractWithoutSigner = new ethers.Contract(contractAddr, ABI, ethersProvider);
  }
  
  return contractWithoutSigner;
}

async function addNewCourse(name, degreeType){
  const contract = await getContractWithSigner(); 
  return await contract.addCourse(name, degreeType);
}

async function editCourse(id, newName, newDegreeType){
  console.log(id, newName, newDegreeType)
  const contract = await getContractWithSigner(); 
  return await contract.changeCourse(id, newName, newDegreeType);
}

async function getCourses(){
  const contract = await getContractWithoutSigner();
  const courses = await contract.getCourses();
  return courses.map((course) => ({id: course.ID, name: course.name, degreeType: course.academic_degree}));
}

async function addNewIssuer(issuer){
  const contract = await getContractWithSigner(); 
  return await contract.addIssuer(issuer);
}

async function getIssuers(){
  const contract = await getContractWithoutSigner(); 
  return contract.getIssuers();
}

async function deleteIssuer(issuer){
  const contract = await getContractWithSigner(); 
  return contract.removeIssuer(issuer);
}

async function getDegreeIDs(){
  const contract = await getContractWithoutSigner(); 
  return contract.getDegreeIDs();
}

async function GetDegree(degreeID, studentCPF, StundentCourseID){
  const contract = await getContractWithoutSigner(); 

  if(degreeID.trim().length > 0) return contract.degrees(degreeID);
  
  return contract.getDegreeByCPFAndCourse(studentCPF, StundentCourseID);  
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
  const contract = await getContractWithSigner(); 
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
  getDegreeIDs,
  GetDegree,
}
export default contract;