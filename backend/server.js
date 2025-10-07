import express from "express";
const app = express();

import cors from "cors";
import 'dotenv/config'

const port = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.get("/", (req,res) => {
    res.send("app is listing")
});


// server started
app.listen(port,()=>{
    console.log("server started")
})
