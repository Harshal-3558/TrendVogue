import user from "@/models/user";
import connectDB from "@/middleware/mongoose";
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const Users = await user.find({ email: req.body.email });
      console.log(Users)
      res.status(200).json({ Users});
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};

export default connectDB(handler);