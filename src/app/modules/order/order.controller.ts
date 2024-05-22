import { Request, Response } from "express";
import { OrderServices } from "./order..service";

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


export const OrderControllers = {
    createOrder,
}