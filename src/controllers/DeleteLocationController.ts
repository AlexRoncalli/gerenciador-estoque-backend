import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteLocationService } from "../services/DeleteLocationService.js";

class DeleteLocationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const service = new DeleteLocationService();
    const result = await service.execute({ id });
    reply.send(result);
  }
}

export { DeleteLocationController };