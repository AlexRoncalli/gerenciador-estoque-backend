import { prisma } from "../prisma/index.js";

class ListLocationsService {
  async execute() {
    const locations = await prisma.productLocation.findMany({
      orderBy: {
        create_at: 'desc' // <-- A CORREÇÃO
      }
    });
    return locations;
  }
}

export { ListLocationsService };