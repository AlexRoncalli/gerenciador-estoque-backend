import { prisma } from "../prisma/index.js";

class CreateMasterLocationService {
  async execute({ name }: { name: string }) {
    if (!name) {
      throw new Error("O nome da localização é obrigatório.");
    }
    const newLocation = await prisma.masterLocation.create({
      data: { name },
    });
    return newLocation;
  }
}

export { CreateMasterLocationService };