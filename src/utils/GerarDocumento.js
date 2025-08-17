import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

const meses = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

const gerarDocumento = async ({ template, data, nomeArquivo = 'documento.docx' }) => {
  try {
    const response = await fetch(`/modelos-doc/${template}`);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const zip = new PizZip(arrayBuffer);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = meses[hoje.getMonth()];
    const ano = hoje.getFullYear();
    const dataFormatada = `${dia} de ${mes} de ${ano}`;

    await doc.resolveData({
      ...data,
      data: data.data || dataFormatada,
    });

    doc.render();

  const output = doc.getZip().generate({ type: 'blob' });
  const nomeFinal = `${(data.title || 'documento')} - Pat. ${data.patrimonio || '___'}`
    .replace(/[\\/:*?"<>|]/g, '')
    + '.docx';

  saveAs(output, nomeFinal);
  } catch (error) {
    console.error('Erro ao gerar documento:', error);
    alert('Erro ao gerar o documento. Verifique o console.');
  }
};

export default gerarDocumento;
