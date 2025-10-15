import { FastifyRequest, FastifyReply } from "fastify";
import { CreateMasterLocationService } from "../services/CreateMasterLocationService.js";

class CreateMasterLocationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name } = request.body as { name: string };

    const createMasterLocationService = new CreateMasterLocationService();

    try {
      const newLocation = await createMasterLocationService.execute({ name });
      reply.send(newLocation);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ error: error.message });
      } else {
        reply.status(500).send({ error: "Ocorreu um erro inesperado." });
      }
    }
  }
}

export { CreateMasterLocationController };