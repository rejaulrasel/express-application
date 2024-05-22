import { Request, Response } from "express";
import { ProductServices } from "./product.service";

//this will call service function and then sent respone to he client
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

export const ProductControllers = {
  createProduct,
};
