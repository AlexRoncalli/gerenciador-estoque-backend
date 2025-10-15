import { prisma } from "../prisma/index.js";

class CountDeletionRequestsService {
  async execute() {
    const count = await prisma.deletionRequest.count({
      where: {
        status: "PENDENTE",
      },
    });
    return { pendingRequests: count };
  }
}

export { CountDeletionRequestsService };