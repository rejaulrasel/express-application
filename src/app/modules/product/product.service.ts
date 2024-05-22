import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductToDb = async (product: Product) => {
    const result = await ProductModel.create(product);
    return result;
};


const getAllProductsFromDb = async () => {
    const result = await ProductModel.find();

    return result;
}


const getSingleProductFromDb = async (productId: string) => {
    const result = await ProductModel.find({ _id: productId })
    return result;
}

export const ProductServices = {
    createProductToDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
};
