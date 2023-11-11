import orders from "@/models/order";
import connectDB from "@/middleware/mongoose";
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const order = await orders.find({ email: req.body.email });
      res.status(200).json({ order: order });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};

export default connectDB(handler);
