import prismaClient from "../prisma/index.js";

class ListLocationsService {
  async execute() {
    const locations = await prismaClient.productLocation.findMany();
    return locations;
  }
}

export { ListLocationsService };