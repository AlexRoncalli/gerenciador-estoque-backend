import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

interface Payload {
  sub: string;
  role: string;
}

export async function isAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return reply.status(401).send({ error: "Token não fornecido." });
  }

  const [, token] = authToken.split(" ");

  // ADICIONE ESTA VERIFICAÇÃO
  if (!token) {
    return reply.status(401).send({ error: "Token malformado." });
  }

  try {
    const { sub, role } = jwt.verify(
      token, // Agora o TypeScript sabe que 'token' é uma string aqui
      process.env.JWT_SECRET as string
    ) as unknown as Payload;

    request.user_id = sub;
    request.user_role = role;

  } catch (err) {
    return reply.status(401).send({ error: "Token inválido ou expirado." });
  }
}