import { Request, Response } from "express";
import { OrderServices } from "./order..service";
import OrderValidationSchema from "./order.validation";


//this will call service function for create orders and then send respone to he client
const createOrder = async (req: Request, res: Response) => {

    try {
        const { order } = req.body;

        //validation by joi
        const { error, value } = OrderValidationSchema.validate(order);
        if (error) {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error.details
            })
            return;
        }



        const result = await OrderServices.createOrderToDb(value);

        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Order creation failed!",
            error,
        })
    }
}


//this will call service function for getting all orders and then send respone to he client

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        const result = await OrderServices.getAllOrdersFromDb(email as string);
        res.status(200).json({
            success: true,
            message: email && !result.length ? "Order Not Found" : email && result.length ? "Orders fetched successfully for user email!" : !email && result.length ? "Orders fetched successfully!" : 'No order yet!',
            data: result.length ? result : 'no order available'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Orders fetched failed!",
            error,
        })
    }
}


export const OrderControllers = {
    createOrder,
    getAllOrders,
}