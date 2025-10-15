import prismaClient from "../prisma/index.js";

interface CreateExitProps {
  sku: string;
  name: string;
  quantity: number;
  date: string;
  exitType: 'Expedição' | 'Full';
  observation?: string; // Opcional
  store?: string;       // Opcional
}

class CreateExitService {
  async execute(data: CreateExitProps) {
    if (!data.sku || !data.name || data.quantity == null || !data.exitType) {
      throw new Error("SKU, Nome, Quantidade e Tipo de Saída são obrigatórios.");
    }

    const exit = await prismaClient.productExit.create({
      data: {
        ...data,
      },
    });
    return exit;
  }
}

export { CreateExitService };