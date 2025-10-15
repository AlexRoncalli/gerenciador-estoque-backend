import prismaClient from "../prisma/index.js";

class ListMasterLocationsService {
  async execute() {
    const locations = await prismaClient.masterLocation.findMany({
      orderBy: { name: 'asc' } // Ordena alfabeticamente
    });
    // Retornamos apenas um array de strings com os nomes
    return locations.map(loc => loc.name);
  }
}

export { ListMasterLocationsService };