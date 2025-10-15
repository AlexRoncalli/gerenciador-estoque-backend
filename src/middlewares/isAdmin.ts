import { FastifyRequest, FastifyReply } from "fastify";

export async function isAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Pegamos a 'role' do usuário que foi adicionada pelo middleware 'isAuthenticated'
  const { user_role } = request;

  if (user_role !== 'ADMIN') {
    // Se o usuário não for um ADMIN, retornamos um erro de "Acesso Proibido"
    return reply.status(403).send({ error: "Acesso negado. Requer permissão de Administrador." });
  }

  // Se for ADMIN, a requisição continua normalmente.
}