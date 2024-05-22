import { Request, Response } from "express";
import { ProductServices } from "./product.service";


//this will call service function for create products function and then send respone to he client
const createProduct = async (req: Request, res: Response) => {
    try {
        const { product } = req.body;

        //will call service function
        const result = await ProductServices.createProductToDb(product);

        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        });
    }
};

//this will call service function for get all products function and then send respone to he client
const getAllProducts = async (req: Request, res: Response) => {

    try {
        const result = await ProductServices.getAllProductsFromDb();
        res.status(200).json({
            success: true,
            message: " Products fetched successfully!",
            data: result,
        });
    } catch (error) {
        res.status(200).json({
            success: true,
            message: "Something went wrong!",
            error: error,
        });
    }

}

//this will call service function for get all products function and then send respone to he client

const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const result = await ProductServices.getSingleProductFromDb(productId);

        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            message: "Product Not Found!",
            error,
        });
    }


}

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
};
