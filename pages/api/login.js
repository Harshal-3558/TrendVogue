import connectDB from "@/middleware/mongoose";
import user from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { Email, Password } = req.body;

    // Use projection to only retrieve the password and name fields
    let u = await user.findOne({ email: Email }, 'password name');
    
    if (u) {
      const isCorrectPassword = await bcrypt.compare(Password, u.password);
      
      if (isCorrectPassword) {
        const token = jwt.sign(
          { email: Email, name: u.name },
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

export default connectDB(handler);