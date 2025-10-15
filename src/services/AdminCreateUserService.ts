import { hash } from "bcryptjs";
import { Role } from '@prisma/client';
import { prisma } from "../prisma/index.js";

interface AdminCreateUserProps {
  name: string;
  password: string;
  role: Role; // O admin pode especificar a role
}

class AdminCreateUserService {
  async execute({ name, password, role }: AdminCreateUserProps) {
    if (!name || !password || !role) {
      throw new Error("Nome, senha e função são obrigatórios.");
    }

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name: name,
        password: passwordHash,
        role: role, // A role é definida pelo admin
      },
      select: {
        id: true,
        name: true,
        role: true,
      },
    });

    return user;
  }
}

export { AdminCreateUserService };