import { FastifyRequest, FastifyReply } from "fastify";
// A importação agora busca o arquivo e a classe no singular
import { DeleteProductService } from "../services/DeleteProductService.js";

class DeleteProductController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sku } = request.params as { sku: string };

    // E aqui usamos a classe no singular
    const productService = new DeleteProductService();

    try {
      const result = await productService.execute({ sku });
      reply.send(result);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ error: error.message });
      } else {
        reply.status(500).send({ error: "Ocorreu um erro inesperado ao deletar." });
      }
    }
  }
}

export { DeleteProductController };