import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateExitObservationService } from "../services/UpdateExitObservationService.js";

class UpdateExitObservationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { observation } = request.body as { observation: string };

    const service = new UpdateExitObservationService();
    try {
      const result = await service.execute({ id, observation });
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

export { UpdateExitObservationController };