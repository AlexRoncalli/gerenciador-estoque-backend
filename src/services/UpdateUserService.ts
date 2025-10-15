import { prisma } from "../prisma/index.js";
import { Role } from '@prisma/client';

interface UpdateUserProps {
  id: string;
  role: Role;
}

class UpdateUserService {
  async execute({ id, role }: UpdateUserProps) {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, role: true },
    });
    return updatedUser;
  }
}

export { UpdateUserService };