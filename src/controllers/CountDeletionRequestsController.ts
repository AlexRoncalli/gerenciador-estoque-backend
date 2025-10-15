import { FastifyRequest, FastifyReply } from "fastify";
import { CountDeletionRequestsService } from "../services/CountDeletionRequestsService.js";

class CountDeletionRequestsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const service = new CountDeletionRequestsService();
    try {
      const result = await service.execute();
      reply.send(result);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao contar solicitações." });
    }
  }
}

export { CountDeletionRequestsController };