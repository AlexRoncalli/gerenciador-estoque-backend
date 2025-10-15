import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteMasterLocationService } from "../services/DeleteMasterLocationService.js";

class DeleteMasterLocationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name } = request.params as { name: string };

    const deleteMasterLocationService = new DeleteMasterLocationService();

    try {
      const result = await deleteMasterLocationService.execute({ name });
      reply.send(result);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ error: error.message });
      } else {
        reply.status(500).send({ error: "Ocorreu um erro inesperado." });
      }
    }
  }
}

export { DeleteMasterLocationController };