import prismaClient from "../prisma/index.js";

class ListUsersService {
  async execute() {
    const users = await prismaClient.user.findMany({
      select: { // Selecionamos os campos para não expor a senha
        id: true,
        name: true,
        role: true,
        create_at: true,
      },
      orderBy: {
        name: 'asc'
      }
    });
    return users;
  }
}

export { ListUsersService };