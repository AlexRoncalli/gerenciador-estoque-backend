import { prisma } from "../prisma/index.js";

interface UpdateObservationProps {
  id: string;
  observation: string;
}

class UpdateExitObservationService {
  async execute({ id, observation }: UpdateObservationProps) {
    if (!id) {
      throw new Error("ID do registro de saída é obrigatório.");
    }

    const updatedExit = await prisma.productExit.update({
      where: { id },
      data: {
        observation: observation,
      },
    });
    return updatedExit;
  }
}

export { UpdateExitObservationService };