import {fastify} from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { addManager } from "./routes/add-manager";
import { addCollaborator } from "./routes/add-collaborator";
import { getCollaborators } from "./routes/get-collaborators";
import { editCollaborator } from "./routes/edit-collaborator";
import { setDayOff } from "./routes/set-day-off";
import { createSchedule } from "./routes/create-schedule";


export const app = fastify().withTypeProvider<ZodTypeProvider>()


app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)


app.register(addManager)
app.register(addCollaborator)
app.register(getCollaborators)
app.register(editCollaborator)
app.register(setDayOff)
app.register(createSchedule)

app.listen({port: 3030}).then(() => {
    console.log("Server Running")
})