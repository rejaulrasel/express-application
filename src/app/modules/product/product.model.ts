import { model, Schema } from 'mongoose';
import { Product } from './product.interface';


const VariantSchema = new Schema({
    type: { type: String, required: true },
    color: { type: String, required: true }
});


const InventorySchema = new Schema({
    quantity: { type: String, required: true },
    inStock: { type: Boolean, required: true }
});



const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [VariantSchema], required: true },
    inventory: { type: InventorySchema, required: true }
})


//create model for productSchema

export const productModel = model<Product>('Products', productSchema)