import { FastifyRequest, FastifyReply } from "fastify";
import { CreateLocationService } from "../services/CreateLocationService.js";

class CreateLocationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    console.log("DADOS RECEBIDOS NO BACKEND:", request.body);
    const { sku, name, location, unitsPerBox, volume, date } = request.body as {
      sku: string;
      name: string;
      location: string;
      unitsPerBox: number;
      volume: number;
      date: string;
    };

    const createLocationService = new CreateLocationService();

    // Enviando todos os campos para o serviço
    const newLocation = await createLocationService.execute({
      sku,
      name,
      location,
      unitsPerBox,
      volume,
      date
    });

    reply.send(newLocation);
  }
}

export { CreateLocationController };