import connectDB from "@/middleware/mongoose";
import product from "@/models/product";

const handler = async (req, res) => {
  let products = await product.find();
  let tshirt = {};
  for (let items of products) {
    if (items.description in tshirt) {
      if (
        !tshirt[items.description].color.includes(items.color) &&
        items.available > 0
      ) {
        tshirt[items.description].color.push(items.color);
      }
      if (
        !tshirt[items.description].size.includes(items.size) &&
        items.available > 0
      ) {
        tshirt[items.description].size.push(items.size);
      }
    } else {
      tshirt[items.description] = JSON.parse(JSON.stringify(items)); // making a key = making whole as value
      if (items.available > 0) {
        tshirt[items.description].color = [items.color];
        tshirt[items.description].size = [items.size];
      }
    }
  }
  res.status(200).json( {products} );
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
