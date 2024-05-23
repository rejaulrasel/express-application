import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import ProductValidationSchema from "./product.validation";

//this will call service function for create products function and then send respone to he client
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    //validation by joi
    const { error, value } = ProductValidationSchema.validate(product);
    if (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.details,
      });
      return;
    }

    //will call service function
    const result = await ProductServices.createProductToDb(value);

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

//this will call service function for gettting all products function and then send respone to he client
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await ProductServices.getAllProductsFromDb(
      searchTerm as string,
    );

    res.status(200).json({
      success: true,
      message:
        searchTerm && !result.length
          ? `Products search term ${searchTerm} not found`
          : searchTerm && result.length
            ? `Products matching search term ${searchTerm} fetched successfully!`
            : !searchTerm && result.length
              ? " Products fetched successfully!"
              : " No products added yet!",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Products fethced failed",
      error: error,
    });
  }
};

//this will call service function for get a single product and then send respone to he client
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProductFromDb(productId);

    if (result == null) {
      res.status(500).json({
        success: true,
        message: "Product not found because of invalid id",
      });
      return;
    }

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
};

//this will call service function for deleting a single product and then send respone to he client
const deleleSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.deleteSingleProductFromDb(productId);

    //cheak the given id is a product id
    if (result.deletedCount == 0) {
      res.status(500).json({
        success: false,
        message: "Product deletaion failed because it is a invalid id",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product deletaion failed because it is a invalid id",
      error,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = req.body;
    const result = await ProductServices.updateSingleProductToDb(
      productId,
      product,
    );
    if (result.matchedCount == 0) {
      res.status(500).json({
        success: false,
        message: "Dont match product id",
      });
      return;
    } else if (result.modifiedCount == 0) {
      res.status(500).json({
        success: false,
        message: "Please update your data",
      });
      return;
    }

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
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleleSingleProduct,
  updateSingleProduct,
};
