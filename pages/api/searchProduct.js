import connectDB from "@/middleware/mongoose";
import Product from "@/models/product";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      if (!req.body.value) {
        // Return an empty response if req.body.value is empty
        res.status(200).json([]);
        return;
      }
      const searchResults = await Product.find(
        {
          $or: [
            { brand: { $regex: req.body.value, $options: "i" } },
            { description: { $regex: req.body.value, $options: "i" } },
          ],
        },
        { brand: 1, description: 1, slug: 1, color: 1, size: 1 },
      );
      const filteredProducts = searchResults.reduce((acc, curr) => {
        const { brand, description, slug } = curr;
        const existingProduct = acc.find(
          (product) =>
            product.brand === brand && product.description === description,
        );

        if (!existingProduct) {
          acc.push({ brand, description, slug });
        }

        return acc;
      }, []);
      res.status(200).json(filteredProducts);
    } catch (error) {
      console.error("Error searching products:", error);
      res
        .status(500)
        .json({ success: false, error: "Error searching products" });
    }
  }
};

export default connectDB(handler);
