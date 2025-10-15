import { FastifyRequest, FastifyReply } from "fastify";
import { RequestDeletionService } from "../services/RequestDeletionService.js";

class RequestDeletionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sku } = request.params as { sku: string };
    const { user_id } = request; // ID do usuário logado, vindo do 'isAuthenticated'

    const service = new RequestDeletionService();

    try {
      const requestResult = await service.execute({
        productSku: sku,
        requestedById: user_id,
      });
      reply.send(requestResult);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ error: error.message });
      } else {
        reply.status(500).send({ error: "Ocorreu um erro inesperado." });
      }
    }
  }
}

export { RequestDeletionController };