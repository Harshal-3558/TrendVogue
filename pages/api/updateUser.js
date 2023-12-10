import connectDB from "@/middleware/mongoose";
import user from "@/models/user";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const User = await user.findOneAndUpdate(
      { email: req.body.email },
      { name: req.body.name, address: req.body.address, phone: req.body.phone},
    );
    res.status(200).json({ success: "Success" });
  } else {
    res.status(400).json({ error: "Error" });
  }
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned
