import { FastifyRequest, FastifyReply } from "fastify";
import { ApproveDeletionRequestService } from "../services/ApproveDeletionRequestService.js";

class ApproveDeletionRequestController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { requestId } = request.params as { requestId: string };
    const { user_id } = request; // ID do admin logado

    const service = new ApproveDeletionRequestService();
    try {
      const result = await service.execute({ requestId, adminId: user_id });
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

export { ApproveDeletionRequestController };