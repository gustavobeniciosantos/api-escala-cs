import {fastify} from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { addManager } from "./routes/add-manager";
import { addCollaborator } from "./routes/add-collaborator";
import { getCollaborators } from "./routes/get-collaborators";
import { editCollaborator } from "./routes/edit-collaborator";


export const app = fastify().withTypeProvider<ZodTypeProvider>()


app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)


app.register(addManager)
app.register(addCollaborator)
app.register(getCollaborators)
app.register(editCollaborator)

app.listen({port: 3030}).then(() => {
    console.log("Server Running")
})