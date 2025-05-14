const mongoose = require("mongoose");
require('dotenv').config({path:'../ENV/config.env'});


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
