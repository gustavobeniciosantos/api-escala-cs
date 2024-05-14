import { FastifyInstance } from "fastify";
import ExcelJS from 'exceljs';
import { prisma } from "../lib/prisma";
import { format } from 'date-fns';

export async function createSchedule(app: FastifyInstance) {
  app.post('/create-schedule', async (request, reply) => {
    // Crie um novo workbook
    const workbook = new ExcelJS.Workbook();

    // Crie uma nova planilha no workbook
    const worksheet = workbook.addWorksheet('Schedule');

    // Adicione os nomes dos colaboradores na primeira coluna
    const collaborators = await prisma.collaborator.findMany();
    collaborators.forEach((collaborator, index) => {
      worksheet.getCell(index + 3, 1).value = collaborator.name;
    });

    // Adicione as datas de cada mês e o dia da semana na primeira linha
    const { month, year } = request.body;
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const formattedDate = format(date, 'd');
      const dayOfWeek = format(date, 'EEE');
      worksheet.getCell(1, day + 1).value = dayOfWeek;
      worksheet.getCell(2, day + 1).value = formattedDate;
    }

   // Pinte as células de cinza para os dias de folga e adicione um "F"
const dayOffs = await prisma.dayOff.findMany();
dayOffs.forEach(dayOff => {
  const rowIndex = collaborators.findIndex(c => c.id === dayOff.collaboratorId) + 3;
  const columnIndex = dayOff.date.getDate() + 1;
  const cell = worksheet.getCell(rowIndex, columnIndex);
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '8080' }
  };
  cell.value = 'F';
});



    // Salve o workbook como um arquivo Excel
    await workbook.xlsx.writeFile('schedule.xlsx');

    reply.code(200).send({ message: 'Schedule created successfully' });
  });
}