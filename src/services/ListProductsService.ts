import prismaClient from "../prisma/index.js";

class ListProductsService{
    async execute(){

        const products = await prismaClient.product.findMany()

        return products;
    }
}

export { ListProductsService }