import connectDB from "@/middleware/mongoose";
import user from "@/models/user";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let u = await user.findOne({ email: req.body.email });
    const isCorrectPassword = await bcrypt.compare(
      req.body.prePassword,
      u.password,
    );
    if (isCorrectPassword) {
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
      const User = await user.findOneAndUpdate(
        { email: req.body.email },
        { password: hashedPassword },
      );
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: "Error" });
    }
  }
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
