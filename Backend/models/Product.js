import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producer",
    required: true,
  },
  alcoholPercentage: { type: Number, required: true },
  type: {
    type: String,
    enum: ["Bijelo", "Crno", "Rose", "Pjenušac"],
    required: true,
  },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
