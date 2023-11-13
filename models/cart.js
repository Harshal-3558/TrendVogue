import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    email: { type: String, require: true },
    itemCode: { type: String, required: true},
    desc: { type: String, require: true },
    qty: { type: Number, require: true },
    color: { type: String, require: true },
    size: { type: String, require: true },
    price: { type: Number, require: true },
    img: { type: String, require: true },
  },
  { timestamps: true },
);

export default mongoose.models.Cart ||
  mongoose.model("Cart", cartSchema);
