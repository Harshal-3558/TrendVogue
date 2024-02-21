import connectDB from "@/middleware/mongoose";
import user from "@/models/user";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let u = new user({ name, email, password: hashedPassword });
    await u.save();
    res.status(200).json({ success: "Success" });
  } else {
    res.status(400).json({ error: "Error" });
  }
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
