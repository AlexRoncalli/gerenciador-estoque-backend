import { FastifyRequest, FastifyReply } from "fastify";
import { ListLocationsService } from "../services/ListLocationsService.js";

class ListLocationsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listLocationsService = new ListLocationsService();
    const locations = await listLocationsService.execute();
    reply.send(locations);
  }
}

export { ListLocationsController };