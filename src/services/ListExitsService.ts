import { prisma } from "../prisma/index.js";

class ListExitsService {
  async execute() {
    const exits = await prisma.productExit.findMany({
      orderBy: {
        create_at: 'desc' // <-- A CORREÇÃO
      }
    });
    return exits;
  }
}

export { ListExitsService };