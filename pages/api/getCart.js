import connectDB from "@/middleware/mongoose";
import cart from "@/models/cart";

const handler = async (req, res) => {
	if (req.method == "POST") {
		const cartItem = await cart.find({
			email: req.body.decoded.email,
		});

		res.status(200).json({ cartItem });
	} else {
		res.status(400).json({ error: "Method not allowed" });
	}
};

export default connectDB(handler);
