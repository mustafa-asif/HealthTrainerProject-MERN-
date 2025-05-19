
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cardioRoutes = require("./routes/cardioRoutes");
const resistanceRoutes = require("./routes/resistanceRoutes");

const userAuthRoutes = require("./routes/userAuthRoutes");

const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();
// user Routes
app.use("/api/auth", userAuthRoutes);

// cardio Routes
app.use("/api/auth/cardio", cardioRoutes);

// resistance Routes
app.use("/api/auth/resistance", resistanceRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
