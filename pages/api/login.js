import connectDB from "@/middleware/mongoose";
import user from "@/models/user";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let u = await user.findOne({ email: req.body.email });
    if (u) {
      // Decryption form DB
      const pass = CryptoJS.AES.decrypt(u.password, "ecommerce");
      const decryptedPass = JSON.parse(pass.toString(CryptoJS.enc.Utf8));
      if (req.body.password == decryptedPass) {
        const token = jwt.sign({ email: u.email, name: u.name }, "ecommerce",{ expiresIn: '2d' });
        res.status(200).json({ success: "true", token });
      } else {
        res.status(400).json({ error: "Error" });
      }
    } else {
      res.status(400).json({ error: "User not exist" });
    }
  }
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
