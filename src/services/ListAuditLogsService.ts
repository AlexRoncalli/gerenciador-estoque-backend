import { prisma } from "../prisma/index.js";

class ListAuditLogsService {
  async execute() {
    const auditLogs = await prisma.auditLog.findMany({
      orderBy: {
        timestamp: 'desc' // Ordena os logs do mais recente para o mais antigo
      }
    });
    return auditLogs;
  }
}

export { ListAuditLogsService };