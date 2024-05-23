import Joi from "joi";

// Define Joi ValidationSchema for Order
const OrderValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().greater(0).required().messages({
    "number.greater": "Quantity must be greater than 0",
  }),
});

export default OrderValidationSchema;
