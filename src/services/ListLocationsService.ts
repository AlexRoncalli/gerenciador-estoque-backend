import { prisma } from "../prisma/index.js";

class ListLocationsService {
  async execute() {
    const locations = await prisma.productLocation.findMany();
    return locations;
  }
}

export { ListLocationsService };