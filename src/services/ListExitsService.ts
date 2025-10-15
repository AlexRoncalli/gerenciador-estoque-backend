import { prisma } from "../prisma/index.js";

class ListExitsService {
  async execute() {
    const exits = await prisma.productExit.findMany();
    return exits;
  }
}

export { ListExitsService };