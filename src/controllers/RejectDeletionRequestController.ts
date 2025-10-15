import { FastifyRequest, FastifyReply } from "fastify";
import { RejectDeletionRequestService } from "../services/RejectDeletionRequestService.js";

class RejectDeletionRequestController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { requestId } = request.params as { requestId: string };
    const { user_id } = request;

    const service = new RejectDeletionRequestService();
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
export { RejectDeletionRequestController };