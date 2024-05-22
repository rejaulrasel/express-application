import { OrderModel } from "./order..model";
import { Order } from "./order.interface";


const createOrderToDb = async (order: Order) => {
    const result = await OrderModel.create(order);
    return result;
};

export const OrderServices = {
    createOrderToDb,
}