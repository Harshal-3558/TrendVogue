import connectDB from "@/middleware/mongoose";
import user from "@/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { Email, Password } = req.body;
    let u = await user.findOne({ email: Email });
    if (u) {
      // Decryption form DB
      const isCorrectPassword = await bcrypt.compare(Password, u.password);
      if (isCorrectPassword) {
        const token = jwt.sign(
          { email: u.email, name: u.name },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "2d" },
        );
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
