const mongoose = require("mongoose");

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res); //If already connected
  }
  await mongoose.connect(process.env.MONGO_URI);
};

export default connectDB;
