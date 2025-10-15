import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateLocationService } from "../services/UpdateLocationService.js";

class UpdateLocationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const data = request.body as {
      sku: string;
      name: string;
      location: string;
      unitsPerBox: number;
      volume: number;
      date: string;
    };

    const updateLocationService = new UpdateLocationService();
    const location = await updateLocationService.execute({ id, ...data });

    reply.send(location);
  }
}

export { UpdateLocationController };