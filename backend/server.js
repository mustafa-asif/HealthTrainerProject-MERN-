
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cardioRoutes = require("./routes/cardioRoutes");

const userAuthRoutes = require("./routes/userAuthRoutes");

const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", userAuthRoutes);
app.use("/api/auth/cardio", cardioRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
