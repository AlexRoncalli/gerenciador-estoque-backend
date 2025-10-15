import { FastifyRequest, FastifyReply } from "fastify";
import { ListAuditLogsService } from "../services/ListAuditLogsService.js";

class ListAuditLogsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listAuditLogsService = new ListAuditLogsService();

    try {
      const logs = await listAuditLogsService.execute();
      reply.send(logs);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar os logs de auditoria." });
    }
  }
}

export { ListAuditLogsController };