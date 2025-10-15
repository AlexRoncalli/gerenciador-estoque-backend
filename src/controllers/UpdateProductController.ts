import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateProductService } from "../services/UpdateProductService.js";

class UpdateProductController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sku } = request.params as { sku: string }; // <-- Mudança aqui
    const data = request.body as { name: string; costPrice: number; quantity: number };

    const productService = new UpdateProductService();
    const product = await productService.execute({ sku, ...data });

    reply.send(product);
  }
}
export { UpdateProductController };