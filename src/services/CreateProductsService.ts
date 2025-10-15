import prismaClient from "../prisma/index.js";

// A INTERFACE PRECISA ACEITAR CAMPOS OPCIONAIS COM '?'
interface CreateProductProps {
  sku: string;
  name: string;
  costPrice: number;
  brand: string;
  quantity: number;
  buyedUnits: number;
  color: string; // Marcado como opcional
  repurchaseRule: number; // Marcado como opcional
}

class CreateProductService {
  async execute({ sku, name, costPrice, brand, quantity, buyedUnits, color, repurchaseRule }: CreateProductProps) {
    if (!sku || !name || costPrice == null || !color || repurchaseRule == null) {
      throw new Error("SKU, Nome, Preço, Cor e Regra de Recompra são obrigatórios.");
    }

    const existingSku = await prismaClient.product.findFirst({
      where: {
        sku: sku,
      },
    });

    if (existingSku) {
      throw new Error("Um produto com este SKU já existe.");
    }

    const product = await prismaClient.product.create({
      data: {
        sku,
        name,
        costPrice,
        brand,
        quantity,
        buyedUnits, // Com 'U' maiúsculo
        color,
        repurchaseRule,
      },
    });

    return product;
  }
}

export { CreateProductService };