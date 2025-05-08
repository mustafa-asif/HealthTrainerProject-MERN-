// const connectDB=require('./connect');
// // require('dotenv').config({path:'./config.env'});

// const express = require('express');

// //initialize express app
// const app = express();

// // const PORT=3000;
// app.use(express.json());

// app.listen(process.env.PORT,()=>{
  //   connectDB.connetToServer();
//   console.log(`Server is running on port ${process.env.PORT}`);
// })
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userAuthRoutes = require("./routes/userAuthRoutes");

const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", userAuthRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
