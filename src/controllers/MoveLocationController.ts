import { FastifyRequest, FastifyReply } from "fastify";
import { MoveLocationService } from "../services/MoveLocationService.js";

class MoveLocationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sourceLocationId, destinationLocationName, volumeToMove } = request.body as {
      sourceLocationId: string;
      destinationLocationName: string;
      volumeToMove: number;
    };

    const service = new MoveLocationService();
    try {
      const result = await service.execute({ sourceLocationId, destinationLocationName, volumeToMove });
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

export { MoveLocationController };