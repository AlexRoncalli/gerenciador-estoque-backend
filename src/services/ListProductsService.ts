import { prisma } from "../prisma/index.js";

class ListProductsService{
    async execute(){

        const products = await prisma.product.findMany()

        return products;
    }
}

export { ListProductsService }