import { prisma } from "../prisma/index.js";

interface RequestDeletionProps {
  productSku: string;
  requestedById: string;
}

class RequestDeletionService {
  async execute({ productSku, requestedById }: RequestDeletionProps) {
    // 1. Verifica se o produto existe
    const product = await prisma.product.findUnique({
      where: { sku: productSku },
    });

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    // 2. Verifica se já existe uma solicitação pendente para este produto
    const existingRequest = await prisma.deletionRequest.findFirst({
      where: {
        productSku: productSku,
        status: "PENDENTE",
      },
    });

    if (existingRequest) {
      throw new Error("Já existe uma solicitação de exclusão pendente para este produto.");
    }

    // 3. Cria a solicitação de exclusão e o log de auditoria em uma única transação
    const [deletionRequest] = await prisma.$transaction([
      prisma.deletionRequest.create({
        data: {
          productSku: productSku,
          requestedById: requestedById,
          status: "PENDENTE",
        },
      }),
      prisma.auditLog.create({
        data: {
          actionType: "SOLICITAR_EXCLUSAO",
          userId: requestedById,
          details: `Solicitação para excluir produto SKU: ${productSku}`,
        },
      }),
    ]);

    return deletionRequest;
  }
}

export { RequestDeletionService };