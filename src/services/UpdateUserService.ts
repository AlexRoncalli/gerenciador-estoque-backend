import prismaClient from "../prisma/index.js";
import { Role } from "../generated/prisma/index.js";

interface UpdateUserProps {
  id: string;
  role: Role;
}

class UpdateUserService {
  async execute({ id, role }: UpdateUserProps) {
    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, role: true },
    });
    return updatedUser;
  }
}

export { UpdateUserService };