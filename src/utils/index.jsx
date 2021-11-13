import { jsPDF } from 'jspdf';

export function generateDegreePDF(degree, courses){
  const course = courses.find((c) => c.id === degree.course_ID);
  const { student } = degree;
  const birthdate = new Date(student.birthdate?.toNumber());
  const completionDate = new Date(degree.completion_date?.toNumber());
  const graduationDate = new Date(degree.graduation_date?.toNumber());
  const issueDate = new Date(degree.issue_date?.toNumber()*1000);

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'cm',
  });
  
  const topText = 
  `REPLUBICA INEXISTENTE DO BRASIL 
  MINISTÉRIO INEXISTENTE DE EDUCAÇÃO
  INSTITUTO INEXISTENTE DE EDUCAÇÃO DE MATO GROSSO
  criado pela Lei nº 000 de dezembro de 2021, publicado no D.O.U em 12/11/2021.`;

  const middleText1 = `O Diretor Geral do Campus Cuiabá do Insituto Inexistente de Educação de Mato Grosso, \
no uso de suas atribuições e tendo em vista a conclusão do curso de ${course.name.toUpperCase()}, no ano de ${completionDate.getFullYear()}, \
e a Colação de Grau em ${graduationDate.toLocaleDateString()} confere o Título de`;
  
  const middleText2 = `${course.degreeType} em ${course.name.toUpperCase()} a`;
  
  const middleText3 = `${student.name.toUpperCase()}`;
  
  const middleText4 = `nascido em ${birthdate.toLocaleDateString()}, \
nacionalidade ${student.nationality.toUpperCase()}, Natural de ${student.birthplace.toUpperCase()}, \
RG nº ${student.RG_number} - ${student.RG_agency}/${student.RG_UF}, outorga-lhe o presente Diploma \
a fim de que possa gozar de todos os direitos e prerrogativas legais.`;

  const middleText5 = `Cuiabá-MT, ${issueDate.toLocaleDateString()}`;

  const backText1 = `Diploma Registrado sob nº ${degree.register_number}.\n
Processo nº ${degree.process_number}.\n
Nos termos da Lei nº 000/99, artigo 11, em ${issueDate.toLocaleDateString()}.`

  const backText2 =`Identificação eletrônica: ${degree.ID} `


  const urlIESImage = 'https://i.imgur.com/VYhNaTQ.png';
  const urlMinisterioImage = 'https://i.imgur.com/DY7kYQa.png';

  doc.addImage(urlMinisterioImage, 'PNG', 1, 0.9);
  doc.addImage(urlIESImage, 'PNG', 24, 0.9);

  doc.setFontSize(14);
  doc.text(topText, 14.5, 2, {align: 'center', lineHeightFactor: 1.3});
  doc.text(middleText1, 15, 7, {align: 'center', maxWidth: 25});

  doc.setFontSize(22);
  doc.text(middleText2, 15, 10, {align: 'center', maxWidth: 25});
  doc.text(middleText3, 15, 12, {align: 'center', maxWidth: 25});

  doc.setFontSize(14);
  doc.text(middleText4, 15, 13, {align: 'center', maxWidth: 25});
  doc.text(middleText5, 15, 18, {align: 'center', maxWidth: 25});
  
  doc.addPage()
  doc.text(backText1, 10, 5, {align: 'center', maxWidth: 25});

  doc.text(backText2, 2, 20, {maxWidth: 25});

  doc.output('pdfobjectnewwindow')
}