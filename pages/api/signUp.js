import connectDB from "@/middleware/mongoose";
import user from "@/models/user";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email } = req.body;
    const pass = CryptoJS.AES.encrypt(
      req.body.password,
      "ecommerce"
    ).toString();
    let u = new user({ name, email, password: pass });
    await u.save();
    res.status(200).json({ success: "Success" });
  } else {
    res.status(400).json({ error: "Error" });
  }
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
