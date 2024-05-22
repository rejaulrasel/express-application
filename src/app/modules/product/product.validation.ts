import Joi from 'joi';

// Define Joi ValidationSchema for Variant
const VariantValidationSchema = Joi.object({
    type: Joi.string().required(),
    value: Joi.string().required()
});

// Define Joi ValidationSchema for Inventory
const InventoryValidationSchema = Joi.object({
    quantity: Joi.number().required(),
    inStock: Joi.boolean().required()
});

// Define Joi ValidationSchema for Product
const ProductValidationSchema = Joi.object({
    name: Joi.string().max(20).required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    variants: Joi.array().items(VariantValidationSchema).required(),
    inventory: InventoryValidationSchema.required()
});

export default ProductValidationSchema;