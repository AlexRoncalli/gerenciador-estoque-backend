import prismaClient from "../prisma/index.js";

class CountDeletionRequestsService {
  async execute() {
    const count = await prismaClient.deletionRequest.count({
      where: {
        status: "PENDENTE",
      },
    });
    return { pendingRequests: count };
  }
}

export { CountDeletionRequestsService };