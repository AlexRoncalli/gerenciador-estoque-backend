import prismaClient from "../prisma/index.js";

interface UpdateLocationProps {
  id: string;
  sku: string;
  name: string;
  location: string;
  unitsPerBox: number;
  volume: number;
  date: string;
}

class UpdateLocationService {
  async execute({ id, ...data }: UpdateLocationProps) {
    const updatedLocation = await prismaClient.productLocation.update({
      where: { id },
      data: data,
    });
    return updatedLocation;
  }
}

export { UpdateLocationService };