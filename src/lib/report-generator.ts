import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface ReportOptions {
  title: string;
  subtitle?: string;
  patientInfo: {
    name: string;
    id: string;
    date: string;
    [key: string]: any;
  };
  measurements?: {
    weight?: number;
    height?: number;
    bmi?: number;
  };
  charts?: Array<{
    title: string;
    base64Image: string;
  }>;
  recommendations?: string[];
  nextAppointment?: string;
}

export async function generateReport(options: ReportOptions) {
  const {
    title,
    subtitle,
    patientInfo,
    measurements,
    charts,
    recommendations,
    nextAppointment,
  } = options;

  const docDefinition = {
    content: [
      { text: title, style: 'header' },
      subtitle ? { text: subtitle, style: 'subheader' } : null,
      { text: 'Información del Paciente', style: 'sectionHeader' },
      {
        table: {
          widths: ['*', '*'],
          body: Object.entries(patientInfo).map(([key, value]) => [
            { text: key.charAt(0).toUpperCase() + key.slice(1), bold: true },
            value,
          ]),
        },
        layout: 'lightHorizontalLines',
      },
      measurements
        ? [
            { text: 'Mediciones', style: 'sectionHeader' },
            {
              table: {
                widths: ['*', '*'],
                body: Object.entries(measurements).map(([key, value]) => [
                  { text: key.charAt(0).toUpperCase() + key.slice(1), bold: true },
                  typeof value === 'number' ? value.toFixed(2) : value,
                ]),
              },
            },
          ]
        : null,
      ...(charts || []).map((chart) => [
        { text: chart.title, style: 'sectionHeader' },
        { image: chart.base64Image, width: 500 },
      ]),
      recommendations?.length
        ? [
            { text: 'Recomendaciones', style: 'sectionHeader' },
            {
              ul: recommendations,
            },
          ]
        : null,
      nextAppointment
        ? [
            { text: 'Próxima Cita', style: 'sectionHeader' },
            { text: nextAppointment },
          ]
        : null,
    ].filter(Boolean),
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 20],
      },
      sectionHeader: {
        fontSize: 14,
        bold: true,
        margin: [0, 15, 0, 5],
      },
    },
    defaultStyle: {
      fontSize: 12,
      margin: [0, 5],
    },
  };

  return new Promise((resolve, reject) => {
    try {
      const pdfDoc = pdfMake.createPdf(docDefinition);
      pdfDoc.getBase64((base64) => {
        resolve(base64);
      });
    } catch (error) {
      reject(error);
    }
  });
}