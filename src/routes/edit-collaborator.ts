import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function editCollaborator(app:FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .patch('/edit-collaborator',{
    schema:{
      body: z.object({
        name: z.string(),
        seniority: z.string(),
        schedule: z.string()
      }),
      response:{
        200: z.object({
          message: z.string()
        })
      }
    }
  }, async (request, reply) =>{
    const  { name, seniority, schedule } = request.body


    const collaborator = await prisma.collaborator.findFirst({
      where: { name },
    });

    if (!collaborator) {
      reply.code(404).send({ message: 'Collaborator not found' });
      return;
    }

    const updatedCollaborator = await prisma.collaborator.update({
      where: { id: collaborator.id },
      data: { seniority, schedule },
    });

    reply.code(200).send({ message: 'Collaborator ' + updatedCollaborator.name + ' updated successfully' });
  })
}
