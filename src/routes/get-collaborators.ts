import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";





export async function getCollaborators(app:FastifyInstance) {

    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/get-collaborators',{
        schema:{
            response:{
                200: z.object({
                    collaborators: z.array(z.object({
                        name: z.string(),
                        seniority: z.string(),
                        schedule: z.string()
                    }))
                })
            }
        }
    }, async (request, reply) =>{

        const collaborators = await prisma.collaborator.findMany({
            select: {
                name: true,
                seniority: true,
                schedule: true
            }
        })

        reply.status(200).send({collaborators: collaborators.map(collaborator =>{
            return{
                name: collaborator.name,
                seniority: collaborator.seniority,
                schedule: collaborator.schedule
            }
        })})


    })
    
}