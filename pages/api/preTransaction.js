import orders from "@/models/order";
import connectDB from "@/middleware/mongoose";
import product from "@/models/product";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const cart = req.body.items;

      // To check whether the cart is not tampered
      for (let item in cart) {
        const product1 = await product.findOne({ slug: cart[item].itemCode });
        // console.log(product1);
        if (product1.price != cart[item].price) {
          res.status(500).json({
            success: "false",
            message:
              "Suspecious activity detected! Please reinitialize your cart!",
          });
        }
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        shipping_options: [{ shipping_rate: "shr_1OA8UoSCj43uWdZHMJE0Tz0F" }],
        line_items: Object.keys(cart).map((item) => {
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: cart[item].desc,
                images: [cart[item].img],
              },
              unit_amount: cart[item].price * 100,
            },
            quantity: req.body.items[item].qty,
          };
        }),
        success_url: `${process.env.NEXT_PUBLIC_HOST}/successOrder?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_HOST}/orders`,
      });
      const ID = await session.id;
      const status = await session.payment_status;
      const amt = await session.amount_total;

      // Initiate order with order ID
      const order = new orders({
        email: req.body.email,
        orderID: ID,
        TransactionID: ID,
        products: cart,
        address: req.body.address,
        amount: amt / 100,
        status: status,
      });
      await order.save();
      res
        .status(200)
        .json({ success: "true", url: session.url, session: session.id });
    } catch (e) {
      res
        .status(500)
        .json({ success: "false", message: "Your cart is empty !" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default connectDB(handler);
