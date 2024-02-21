import connectDB from "@/middleware/mongoose";
import Product from "@/models/product";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const searchResults = await Product.find({ $text: { $search: req.body.value } });
      console.log(searchResults);
      res.status(200).json({ success: true, data: searchResults });
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ success: false, error: "Error searching products" });
    }
  }
};

export default connectDB(handler);