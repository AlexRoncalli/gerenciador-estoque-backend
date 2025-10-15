import prismaClient from "../prisma/index.js";

interface RejectDeletionRequestProps {
  requestId: string;
  adminId: string;
}
class RejectDeletionRequestService {
  async execute({ requestId, adminId }: RejectDeletionRequestProps) {
    const request = await prismaClient.deletionRequest.findFirst({
      where: { id: requestId, status: "PENDENTE" },
    });

    if (!request) {
      throw new Error("Solicitação não encontrada ou já processada.");
    }

    await prismaClient.$transaction([
      prismaClient.deletionRequest.update({
        where: { id: requestId },
        data: { status: "REJEITADO", approvedOrRejectedById: adminId },
      }),
      prismaClient.auditLog.create({
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