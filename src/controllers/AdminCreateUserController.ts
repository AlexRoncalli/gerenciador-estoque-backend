import { FastifyRequest, FastifyReply } from "fastify";
import { AdminCreateUserService } from "../services/AdminCreateUserService.js";
import { Role } from "../generated/prisma/index.js";

class AdminCreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, password, role } = request.body as { name: string; password: string; role: Role };
    const service = new AdminCreateUserService();

    try {
      const user = await service.execute({ name, password, role });
      reply.send(user);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ error: error.message });
      } else {
        reply.status(500).send({ error: "Ocorreu um erro inesperado." });
      }
    }
  }
}

export { AdminCreateUserController };