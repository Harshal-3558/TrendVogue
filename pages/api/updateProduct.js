import connectDB from "@/middleware/mongoose";
import product from "@/models/product";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = await product.findByIdAndUpdate(req.body[i]._id, req.body[i]);
    }
    res.status(200).json({ success: "Added to DB" });
  } else {
    res.status(400).json({ error: "This is not allowed" });
  }
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
