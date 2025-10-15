import prismaClient from "../prisma/index.js";

interface UpdateProductProps {
  sku: string; // <-- Mudamos de id para sku
  name: string;
  costPrice: number;
  quantity: number;
}

class UpdateProductService {
  async execute({ sku, ...data }: UpdateProductProps) {
    const updatedProduct = await prismaClient.product.update({
      where: { sku }, // <-- Mudança aqui
      data: data,
    });
    return updatedProduct;
  }
}
export { UpdateProductService };