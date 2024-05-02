import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { format, parse } from 'date-fns';

export async function setDayOff(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .post('/set-day-off', {
    schema:{
      body: z.object({
        name: z.string(),
        date: z.string() 
      }),
      response:{
        200: z.object({
          message: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const { name, date: dateString } = request.body

    const date = parse(dateString, 'dd/MM/yyyy', new Date());

    const collaborator = await prisma.collaborator.findFirst({
      where: { name },
    })

    if (!collaborator) {
      reply.code(404).send({ message: 'Collaborator not found' });
      return;
    }

    const addDate = await prisma.dayOff.create({
      data: {
        date: date,
        collaboratorId: collaborator.id
      },
    })

    const formattedDate = format(date, 'dd/MM/yyyy');
    reply.code(200).send({ message: 'Day off set successfully for ' + collaborator.name + ' on ' + formattedDate });
  })
}
