import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function addCollaborator(app:FastifyInstance) {

    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/add-collaborator',{

        schema:{
            body: z.object({
                name: z.string(),
                seniority: z.string(),
                schedule: z.string()
            }),
            response:{
                201: z.object({
                    message: z.string()
                })
            }
        }

    }, async (request, reply) =>{

        const {name, seniority, schedule} = request.body

        const nameExists = await prisma.collaborator.findUnique({
            where: {name}
        })

        if(nameExists){
            reply.status(401).send({message: 'Usuário já registrado'})
        }

        const collaborator = await prisma.collaborator.create({
            data:{
                name,
                seniority,
                schedule
            }
        })

        return reply.status(201).send({message: 'Colaborador ' + collaborator.name + ' cadastrado' })
    })
    
}