import orders from "@/models/order";
import connectDB from "@/middleware/mongoose";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        req.body.session_id
      );
      const ID = await session.id;
      const status = await session.payment_status;
      const order = await orders.findOneAndUpdate(
        { orderID: ID },
        { status: status }
      );
      res.status(200).json({ order: order });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};

export default connectDB(handler);
