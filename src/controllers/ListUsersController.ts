import { FastifyRequest, FastifyReply } from "fastify";
import { ListUsersService } from "../services/ListUsersService.js";

class ListUsersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listUsersService = new ListUsersService();

    try {
      const users = await listUsersService.execute();
      reply.send(users);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(500).send({ error: error.message });
      } else {
        reply.status(500).send({ error: "Ocorreu um erro inesperado ao listar os usuários." });
      }
    }
  }
}

export { ListUsersController };