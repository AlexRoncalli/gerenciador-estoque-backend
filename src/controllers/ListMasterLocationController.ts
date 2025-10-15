import { FastifyRequest, FastifyReply } from "fastify";
import { ListMasterLocationsService } from "../services/ListMasterLocationsService.js";

class ListMasterLocationsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listMasterLocationsService = new ListMasterLocationsService();

    try {
      const locations = await listMasterLocationsService.execute();
      reply.send(locations);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar a lista de localizações." });
    }
  }
}

export { ListMasterLocationsController };