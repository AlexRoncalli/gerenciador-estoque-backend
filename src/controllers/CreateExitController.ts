import { FastifyRequest, FastifyReply } from "fastify";
import { CreateExitService } from "../services/CreateExitService.js";

class CreateExitController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as {
      sku: string;
      name: string;
      quantity: number;
      date: string;
      exitType: 'Expedição' | 'Full';
      store?: string;
      observation?: string;
    };
    
    const createExitService = new CreateExitService();
    const exit = await createExitService.execute(data);
    reply.send(exit);
  }
}

export { CreateExitController };