import connectDB from "@/middleware/mongoose";
import { jwtDecode } from "jwt-decode";
import user from "@/models/user";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const decoded = jwtDecode(req.body.token);
    let u = await user.findOne({ email: decoded.email });
    if (u) {
      const pass = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.JWT_SECRET_KEY,
      ).toString();
      const User = await user.findOneAndUpdate(
        { email: decoded.email },
        { password: pass },
      );
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: "Error" });
    }
  }
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
