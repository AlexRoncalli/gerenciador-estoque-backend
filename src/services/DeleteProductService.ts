import { prisma } from "../prisma/index.js";

interface DeleteProductProps {
  sku: string;
}

// Garanta que o nome da classe esteja no singular
class DeleteProductService {
  async execute({ sku }: DeleteProductProps) {
    if (!sku) {
      throw new Error("Solicitação Inválida. SKU é obrigatório.");
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.productLocation.deleteMany({ where: { sku: sku } });
      await prisma.productExit.deleteMany({ where: { sku: sku } });
      await prisma.product.delete({ where: { sku: sku } });
    });

    return { message: "Produto e todos os seus registros associados foram deletados." };
  }
}

export { DeleteProductService }; // E a exportação também