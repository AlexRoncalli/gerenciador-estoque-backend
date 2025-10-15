import { prisma } from "../prisma/index.js";

interface RejectDeletionRequestProps {
  requestId: string;
  adminId: string;
}
class RejectDeletionRequestService {
  async execute({ requestId, adminId }: RejectDeletionRequestProps) {
    const request = await prisma.deletionRequest.findFirst({
      where: { id: requestId, status: "PENDENTE" },
    });

    if (!request) {
      throw new Error("Solicitação não encontrada ou já processada.");
    }

    await prisma.$transaction([
      prisma.deletionRequest.update({
        where: { id: requestId },
        data: { status: "REJEITADO", approvedOrRejectedById: adminId },
      }),
      prisma.auditLog.create({
        data: {
          actionType: "REJEITAR_EXCLUSAO",
          userId: adminId,
          details: `Exclusão do produto SKU ${request.productSku} rejeitada.`,
        },
      }),
    ]);

    return { message: "Solicitação rejeitada com sucesso." };
  }
}
export { RejectDeletionRequestService };