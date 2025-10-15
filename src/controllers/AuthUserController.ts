import { FastifyRequest, FastifyReply } from "fastify";
import { AuthUserService } from "../services/AuthUserService.js";

class AuthUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, password } = request.body as { name: string; password: string };

    const authUserService = new AuthUserService();

    try {
      const { token } = await authUserService.execute({ name, password });
      reply.send({ token });
    } catch (error) {
      if (error instanceof Error) {
        reply.status(401).send({ error: error.message }); // 401 Unauthorized é mais apropriado para login
      } else {
        reply.status(500).send({ error: "An unexpected error occurred" });
      }
    }
  }
}

export { AuthUserController };