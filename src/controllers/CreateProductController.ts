import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductService } from "../services/CreateProductsService.js";

class CreateProductController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { 
      sku, 
      name, 
      costPrice, 
      quantity, 
      brand, 
      buyedUnits, 
      color, 
      repurchaseRule 
    } = request.body as {
      sku: string;
      name: string;
      costPrice: number;
      quantity: number;
      brand: string;
      buyedUnits: number;
      color: string;
      repurchaseRule: number;
    };

    const productService = new CreateProductService();
    
  
    const product = await productService.execute({ 
      sku, 
      name, 
      costPrice, 
      quantity, 
      brand, 
      buyedUnits, 
      color, 
      repurchaseRule 
    });

    reply.send(product);
  }
}

export { CreateProductController };