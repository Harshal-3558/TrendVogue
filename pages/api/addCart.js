import connectDB from "@/middleware/mongoose";
import cart from "@/models/cart";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const c = await cart.find({
      email: req.body.email,
      itemCode: req.body.itemCode,
    });

    let item;
    if (c != 0) {
      const new_qty = c[0].qty + 1;
      item = await cart.findOneAndUpdate(
        {
          email: req.body.email,
          itemCode: req.body.itemCode,
        },
        { qty: new_qty },
      );
    } else {
      item = new cart({
        email: req.body.email,
        itemCode: req.body.itemCode,
        desc: req.body.desc,
        qty: req.body.qty,
        color: req.body.color,
        size: req.body.size,
        price: req.body.price,
        img: req.body.img,
      });
      await item.save();
    }

    const cartItem = await cart.find({
      email: req.body.email,
    });
    res.status(200).json({ cartItem });
  } else {
    res.status(400).json({ error: "This is not allowed" });
  }
};

export default connectDB(handler);
