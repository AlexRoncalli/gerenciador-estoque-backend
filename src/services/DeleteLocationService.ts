import { prisma } from "../prisma/index.js";

class DeleteLocationService {
  async execute({ id }: { id: string }) {
    if (!id) {
      throw new Error("ID é obrigatório.");
    }
    await prisma.productLocation.delete({ where: { id } });
    return { message: "Localização deletada com sucesso." };
  }
}

export { DeleteLocationService };  