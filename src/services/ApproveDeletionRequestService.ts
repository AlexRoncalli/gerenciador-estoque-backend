import { prisma } from "../prisma/index.js";

interface ApproveDeletionRequestProps {
  requestId: string;
  adminId: string;
}

class ApproveDeletionRequestService {
  async execute({ requestId, adminId }: ApproveDeletionRequestProps) {
    // Encontra a solicitação para garantir que ela existe e está pendente
    const request = await prisma.deletionRequest.findFirst({
      where: { id: requestId, status: "PENDENTE" },
    });

    if (!request) {
      throw new Error("Solicitação não encontrada ou já processada.");
    }

    // Executa todas as operações em uma única transação
    await prisma.$transaction(async (prisma) => {
      // 1. Atualiza o status da solicitação
      await prisma.deletionRequest.update({
        where: { id: requestId },
        data: {
          status: "APROVADO",
          approvedOrRejectedById: adminId,
        },
      });

      // 2. Deleta o produto principal
      await prisma.product.delete({
        where: { sku: request.productSku },
      });

      // 3. Deleta todas as localizações associadas a esse produto
      await prisma.productLocation.deleteMany({
        where: { sku: request.productSku },
      });

      // 4. Cria o log de auditoria para a aprovação
      await prisma.auditLog.create({
        data: {
          actionType: "APROVAR_EXCLUSAO",
          userId: adminId,
          details: `Exclusão do produto SKU ${request.productSku} aprovada.`,
        },
      });
    });

    return { message: "Solicitação aprovada e produto excluído com sucesso." };
  }
}

export { ApproveDeletionRequestService };