import { prisma } from "../prisma/index.js";

class ListDeletionRequestsService {
  async execute() {
    // Busca todas as requisições com status PENDENTE
    const requests = await prisma.deletionRequest.findMany({
      where: {
        status: "PENDENTE",
      },
      orderBy: {
        create_at: "asc", // Ordena das mais antigas para as mais novas
      },
    });
    return requests;
  }
}

export { ListDeletionRequestsService };