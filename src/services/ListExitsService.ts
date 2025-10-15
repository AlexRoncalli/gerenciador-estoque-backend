import prismaClient from "../prisma/index.js";

class ListExitsService {
  async execute() {
    const exits = await prismaClient.productExit.findMany();
    return exits;
  }
}

export { ListExitsService };