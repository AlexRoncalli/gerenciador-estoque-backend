import { prisma } from "../prisma/index.js";

interface CreateLocationProps {
  sku: string;
  name: string;
  location: string;
  unitsPerBox: number;
  volume: number;
  date: string;
}

class CreateLocationService {
  async execute(data: CreateLocationProps) {
    if (!data.sku || !data.name || !data.location || data.volume == null || data.unitsPerBox == null || !data.date) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    const location = await prisma.productLocation.create({
      data: {
        sku: data.sku,
        name: data.name,
        location: data.location,
        unitsPerBox: data.unitsPerBox,
        volume: data.volume,
        date: data.date,
      },
    });
    return location;
  }
}

export { CreateLocationService };