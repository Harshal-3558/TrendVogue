import connectDB from "@/middleware/mongoose";
import user from "@/models/user";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  if (req.method == "POST") {
    // Use projection to only retrieve the password field
    let u = await user.findOne({ email: req.body.email }, 'password');
    
    const isCorrectPassword = await bcrypt.compare(req.body.prePassword, u.password);
    
    if (isCorrectPassword) {
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
      
      // Use findOneAndUpdate to find and update the user in a single query
      await user.findOneAndUpdate(
        { email: req.body.email },
        { password: hashedPassword },
      );
      
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: "Error" });
    }
  }
};

export default connectDB(handler);