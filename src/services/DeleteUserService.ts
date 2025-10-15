import { prisma } from "../prisma/index.js";

class DeleteUserService {
  async execute({ id }: { id: string }) {
    await prisma.user.delete({
      where: { id },
    });
    return { message: "Usuário deletado com sucesso." };
  }
}

export { DeleteUserService };