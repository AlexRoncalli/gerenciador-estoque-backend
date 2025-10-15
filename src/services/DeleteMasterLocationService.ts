import prismaClient from "../prisma/index.js";

class DeleteMasterLocationService {
  async execute({ name }: { name: string }) {
    if (!name) {
      throw new Error("O nome da localização é obrigatório.");
    }
    await prismaClient.masterLocation.delete({
      where: { name },
    });
    return { message: "Localização mestre deletada com sucesso." };
  }
}

export { DeleteMasterLocationService };