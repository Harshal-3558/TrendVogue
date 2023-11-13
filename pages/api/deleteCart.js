import connectDB from "@/middleware/mongoose";
import cart from "@/models/cart";

const handler = async (req, res) => {
	if (req.method == "POST") {
		const item = await cart.deleteOne({
			_id: req.body.ID,
		});
		const cartItem = await cart.find({
			email: req.body.email,
		});

		res.status(200).json({ cartItem });
	} else {
		res.status(400).json({ error: "This is not allowed" });
	}
};

export default connectDB(handler);
