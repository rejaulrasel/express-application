import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import OrderValidationSchema from "./order.validation";
import { ProductModel } from "../product/product.model";

//this will call service function for create orders and then send respone to he client
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    //validation by joi
    const { error, value } = OrderValidationSchema.validate(order);

    //if any validation error causes it will appear here
    if (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.details,
      });
      return;
    }

    //get orderQuantity, orderedProductId from validated data by joi
    const { productId: orderedProductId, quantity: orderQuantity } = value;
    //finding the ordered product
    const productInfo = await ProductModel.findOne({ _id: orderedProductId });

    //get productQuantity and productStock from ordered product
    const productQuantity: number = productInfo?.inventory?.quantity ?? 0;
    let productStock = productInfo?.inventory?.inStock;

    //if any order will create a invalid product id it causes error
    if (productQuantity == 0) {
      res.status(500).json({
        success: false,
        message: "Invalid product id",
      });
      return;
    }
    //check if the order quantity is higher than productQuantity
    if (orderQuantity > productQuantity) {
      res.status(500).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
      return;
    }

    // update the product quantity after subtracting the order quantity
    const updatedQuantity: number = productQuantity - orderQuantity;

    // update the product stock status when stock reaches to zero it will false
    if (updatedQuantity < 1) {
      productStock = false;
    }

    //put the updated information to the product
    await ProductModel.updateOne(
      { _id: orderedProductId },
      {
        "inventory.quantity": updatedQuantity,
        "inventory.inStock": productStock,
      },
    );

    //call service function
    const result = await OrderServices.createOrderToDb(value);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order not found!",
      error,
    });
  }
};

//this will call service function for getting all orders and then send respone to he client

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await OrderServices.getAllOrdersFromDb(email as string);

    res.status(200).json({
      success: true,
      message:
        email && !result.length
          ? "Order Not Found"
          : email && result.length
            ? "Orders fetched successfully for user email!"
            : !email && result.length
              ? "Orders fetched successfully!"
              : "No order yet!",
      data: result.length ? result : "no order available",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Orders fetched failed!",
      error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
