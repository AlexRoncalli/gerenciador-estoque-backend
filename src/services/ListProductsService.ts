import { prisma } from "../prisma/index.js";

class ListProductsService {
  async execute() {
    const products = await prisma.product.findMany({
      orderBy: {
        create_at: 'desc' // Ordena pelo campo 'create_at' em ordem decrescente
      }
    });
    return products;
  }
}

export { ListProductsService };