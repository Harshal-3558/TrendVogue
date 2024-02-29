import connectDB from "@/middleware/mongoose";
import user from "@/models/user";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try{
      const {Email,Name,Password} = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);
    let u = new user({ name : Name, email: Email, password: hashedPassword });
    await u.save();
    res.status(200).json({ success: true });
    }catch(error){
      res.status(200).json({ success: false });
    }
  }
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
