import connectDB from "@/middleware/mongoose";
import cart from "@/models/cart";

const handler = async (req, res) => {
	if (req.method == "POST") {
		const c = await cart.find({
			_id: req.body.ID,
		});
		console.log(c);
		if (c[0].qty > 1) {
			const new_qty = c[0].qty - 1;
			await cart.findOneAndUpdate(
				{
					_id: req.body.ID,
				},
				{ qty: new_qty },
			);
		} else {
			const item = await cart.deleteOne({
				_id: req.body.ID,
			});
		}
		res.status(200).json({ success: "success" });
	} else {
		res.status(400).json({ error: "This is not allowed" });
	}
};

export default connectDB(handler);
