import Joi from "joi";

// Define Joi ValidationSchema for Order
const OrderValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

export default OrderValidationSchema;
