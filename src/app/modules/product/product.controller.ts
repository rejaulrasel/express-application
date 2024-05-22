import { Request, Response, query } from "express";
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
        res.status(500).json({
            success: false,
            message: "Failed to create product!",
            error: error,
        });
    }
};

//this will call service function for get all products function and then send respone to he client
const getAllProducts = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;
        const result = await ProductServices.getAllProductsFromDb(searchTerm as string);


        res.status(200).json({
            success: true,
            message: searchTerm ? `Products matching search term ${searchTerm} fetched successfully!` : " Products fetched successfully!",
            data: result,
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        });
    }

}

//this will call service function for get a single product and then send respone to he client
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
        res.status(500).json({
            success: false,
            message: "Product Not Found!",
            error,
        });
    }


}

//this will call service function for deleting a single product and then send respone to he client
const deleleSingleProduct = async (req: Request, res: Response) => {

    try {
        const productId = req.params.productId
        const result = await ProductServices.deleteSingleProductFromDb(productId)

        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Product deletion failed!",
            error,
        });
    }
}

const updateSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const { product } = req.body;
        const result = await ProductServices.updateSingleProductToDb(productId, product);

        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Product update causes failed",
            error,
        });
    }

}



export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleleSingleProduct,
    updateSingleProduct,
};
