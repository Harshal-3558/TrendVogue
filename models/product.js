import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    brand: { type: String },
    description: { type: String, require: true },
    img: { type: String, require: true },
    category: { type: String, require: true },
    price: { type: Number, require: true },
    rating: { type: String, require: true },
    color: { type: String, require: true },
    size: { type: String, require: true },
    delivery: { type: [Number], require: true },
    available: { type: Number, require: true },
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
