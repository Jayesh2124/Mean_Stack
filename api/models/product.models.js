import mongoose, { Schema } from 'mongoose';

// Define schema for product document
const ProductSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  inStock: { type: Boolean, required: true }
});

export const ProductModel = new mongoose.model('Product', ProductSchema);
