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
    const result = await ProductModel.findOne({ _id: productId })
    return result;
}

const deleteSingleProductFromDb = async (productId: string) => {
    const result = await ProductModel.deleteOne({ _id: productId })
    return result;
}

const updateSingleProductToDb = async (productId: string, product: Product) => {
    const result = await ProductModel.updateOne({ _id: productId }, { $set: { ...product } })
    return result
}

export const ProductServices = {
    createProductToDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
    deleteSingleProductFromDb,
    updateSingleProductToDb,
};
