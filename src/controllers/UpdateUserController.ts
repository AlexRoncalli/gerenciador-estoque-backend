import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserService } from "../services/UpdateUserService.js";
import { Role } from "../generated/prisma/index.js";

class UpdateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { role } = request.body as { role: Role };

    const updateUserService = new UpdateUserService();

    try {
      const updatedUser = await updateUserService.execute({ id, role });
      reply.send(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ error: error.message });
      } else {
        reply.status(500).send({ error: "Ocorreu um erro inesperado ao atualizar o usuário." });
      }
    }
  }
}

export { UpdateUserController };