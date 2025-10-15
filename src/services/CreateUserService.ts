import { prisma } from "../prisma/index.js";
import { hash } from "bcryptjs";

interface CreateUserProps {
  name: string;
  password: string;
}

class CreateUserService {
  async execute({ name, password }: CreateUserProps) {
    if (!name || !password) {
      throw new Error("Preencha todos os campos");
    }

    // Criptografa a senha antes de salvar
    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name: name,
        password: passwordHash,
        // A 'role' será 'FUNCIONARIO' por padrão, conforme o schema
      },
      select: { // Retorna o usuário sem a senha
        id: true,
        name: true,
        role: true,
      },
    });

    return user;
  }
}

export { CreateUserService };