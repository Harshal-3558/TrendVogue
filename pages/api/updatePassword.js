import connectDB from "@/middleware/mongoose";
import user from "@/models/user";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let u = await user.findOne({ email: req.body.email });
    console.log(req.body.prePassword)
    // Decryption form DB
    const pass = CryptoJS.AES.decrypt(u.password, "ecommerce");
    const decryptedPass = JSON.parse(pass.toString(CryptoJS.enc.Utf8));
    if (req.body.prePassword == decryptedPass) {
      const pass = CryptoJS.AES.encrypt(
        req.body.newPassword,
        "ecommerce",
      ).toString();
      const User = await user.findOneAndUpdate(
        { email: req.body.email },
        { password: pass },
      );
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: "Error" });
    }
  }
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
