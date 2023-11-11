const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    email: { type: String, required: true }, // type: String is shorthand for {type: type: String}
    orderID: { type: String, required: true },
    TransactionID: { type: String, required: true },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
  },
  { timestamps: true }
);

// mongoose.models = {};
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
