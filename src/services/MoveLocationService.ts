import { prisma } from "../prisma/index.js";

interface MoveLocationProps {
  sourceLocationId: string;
  destinationLocationName: string;
  volumeToMove: number;
}

class MoveLocationService {
  async execute({ sourceLocationId, destinationLocationName, volumeToMove }: MoveLocationProps) {
    if (!sourceLocationId || !destinationLocationName || !volumeToMove || volumeToMove <= 0) {
      throw new Error("Dados para movimentação inválidos.");
    }

    return await prisma.$transaction(async (prisma) => {
      const sourceLocation = await prisma.productLocation.findUnique({
        where: { id: sourceLocationId },
      });

      if (!sourceLocation || sourceLocation.volume < volumeToMove) {
        throw new Error("Volume insuficiente na origem ou localização não encontrada.");
      }

      let destinationLocation = await prisma.productLocation.findFirst({
        where: {
          sku: sourceLocation.sku,
          location: destinationLocationName,
          unitsPerBox: sourceLocation.unitsPerBox,
        },
      });

      if (destinationLocation) {
        await prisma.productLocation.update({
          where: { id: destinationLocation.id },
          data: { volume: { increment: volumeToMove } }, // Soma o volume
        });
      } else {
        await prisma.productLocation.create({
          data: {
            sku: sourceLocation.sku,
            name: sourceLocation.name,
            location: destinationLocationName,
            unitsPerBox: sourceLocation.unitsPerBox,
            volume: volumeToMove,
            date: new Date().toLocaleDateString('pt-BR'),
          },
        });
      }

      const newSourceVolume = sourceLocation.volume - volumeToMove;
      if (newSourceVolume > 0) {
        await prisma.productLocation.update({
          where: { id: sourceLocationId },
          data: { volume: newSourceVolume },
        });
      } else {
        await prisma.productLocation.delete({
          where: { id: sourceLocationId },
        });
      }

      return { message: "Movimentação concluída com sucesso." };
    });
  }
}

export { MoveLocationService };