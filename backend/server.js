import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();

import cors from "cors";
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// routes
import adminRouter from "./routes/adminRoute.js";

// app config
const port = process.env.PORT || 8080;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/v1/admin', adminRouter);

app.get("/", (req,res) => {
    res.send("app is listing")
});

// server started
app.listen(port,()=>{
    console.log("server started")
})
