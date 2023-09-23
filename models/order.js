const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userID: { type: String, required: true }, // type: String is shorthand for {type: type: String}
    products: [
      {
        productID: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
  },
  { timestamps: true },
);

// mongoose.models = {};
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
