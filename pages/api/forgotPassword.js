import connectDB from "@/middleware/mongoose";
import { jwtDecode } from "jwt-decode";
import user from "@/models/user";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const decoded = jwtDecode(req.body.token);
    let u = await user.findOne({ email: decoded.email });
    if (u) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const User = await user.findOneAndUpdate(
        { email: decoded.email },
        { password: hashedPassword },
      );
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: "Error" });
    }
  }
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
