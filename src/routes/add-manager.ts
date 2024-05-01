import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";



export async function addManager(app:FastifyInstance){

    app.
    withTypeProvider<ZodTypeProvider>()
    .post('/add-manager',{
        schema:{
            body: z.object({
                name: z.string(),
                username: z.string(),
                email: z.string(),
                password: z.string()
            }),
            response:{
                201: z.object({
                    message: z.string()
                })
            }
        }
    },async(request, reply)=>{

        const  {name, username, email, password} = request.body

        const usernameExists = await prisma.manager.findUnique({
            where: { username }
          });
          
          const emailExists = await prisma.manager.findUnique({
            where: { email }
          })

          
          if(usernameExists ){
            throw new Error('E-mail already registered')
          } else if(emailExists){
            throw new Error('Username already registered')
          }

          const manager = await prisma.manager.create({
            data:{
                name,
                username,
                email,
                password,
                }
          })
          return reply.status(201).send({message: 'Usuário ' + manager.name + ' criado'})
    })
}