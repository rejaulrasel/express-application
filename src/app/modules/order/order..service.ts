import { ProductModel } from "../product/product.model";
import { OrderModel } from "./order..model";
import { Order } from "./order.interface";

const createOrderToDb = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrdersFromDb = async (email: string) => {
  if (email) {
    const result = await OrderModel.find({ email });
    return result;
  }
  const result = await OrderModel.find();
  return result;
};

export const OrderServices = {
  createOrderToDb,
  getAllOrdersFromDb,
};
