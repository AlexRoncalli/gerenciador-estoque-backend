import { FastifyRequest, FastifyReply } from "fastify";
import { ListExitsService } from "../services/ListExitsService.js";

class ListExitsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listExitsService = new ListExitsService();
    const exits = await listExitsService.execute();
    reply.send(exits);
  }
}

export { ListExitsController };