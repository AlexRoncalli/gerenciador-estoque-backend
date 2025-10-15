import { FastifyRequest, FastifyReply } from "fastify";
import { ListDeletionRequestsService } from "../services/ListDeletionRequestsService.js";

class ListDeletionRequestsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const service = new ListDeletionRequestsService();
    try {
      const requests = await service.execute();
      reply.send(requests);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao listar solicitações." });
    }
  }
}

export { ListDeletionRequestsController };