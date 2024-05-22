import { Request, Response } from "express";
import { OrderServices } from "./order..service";


//this will call service function for create orders and then send respone to he client
const createOrder = async (req: Request, res: Response) => {

    try {
        const { order } = req.body;
        const result = await OrderServices.createOrderToDb(order);

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
            message: email ? "Orders fetched successfully for user email!" : "Orders fetched successfully!",
            data: result
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