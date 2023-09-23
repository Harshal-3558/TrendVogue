import connectDB from "@/middleware/mongoose";
import product from "@/models/product";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = new product({
        slug: req.body[i].slug,
        brand: req.body[i].brand,
        description: req.body[i].description,
        img: req.body[i].img,
        category: req.body[i].category,
        price: req.body[i].price,
        rating: req.body[i].rating,
        color: req.body[i].color,
        size: req.body[i].size,
        delivery: req.body[i].delivery,
        available: req.body[i].available,
      });

      await p.save();
    }
    res.status(200).json({ success: "Added to DB" });
  } else {
    res.status(400).json({ error: "This is not allowed" });
  }
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
