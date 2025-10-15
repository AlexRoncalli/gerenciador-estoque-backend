import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteUserService } from "../services/DeleteUserService.js";

class DeleteUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const deleteUserService = new DeleteUserService();

    try {
      const result = await deleteUserService.execute({ id });
      reply.send(result);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ error: error.message });
      } else {
        reply.status(500).send({ error: "Ocorreu um erro inesperado ao deletar o usuário." });
      }
    }
  }
}

export { DeleteUserController };