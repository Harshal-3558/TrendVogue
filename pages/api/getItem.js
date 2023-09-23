import connectDB from "@/middleware/mongoose";
import product from "@/models/product";

const handler = async (req, res) => {
  let products = await product.find();
  res.status(200).json({ products });
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
