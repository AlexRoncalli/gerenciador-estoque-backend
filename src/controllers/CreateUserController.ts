import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService } from "../services/CreateUserService.js";

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, password } = request.body as { name: string; password: string };
    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({ name, password });
      reply.send(user);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ error: error.message });
      } else {
        reply.status(500).send({ error: "An unexpected error occurred" });
      }
    }
  }
}

export { CreateUserController };