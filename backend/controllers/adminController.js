import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import fs from "fs";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // 1️⃣ Validate required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "Missing required details" });
        }

        // 2️⃣ Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        // 3️⃣ Validate password length
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        // 4️⃣ Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // // 5️⃣ Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
            folder: "doctor/uploads",
        });

        const imageUrl = imageUpload.secure_url;

        // Delete local file after upload
        fs.unlinkSync(imageFile.path);

        // 6️⃣ Prepare doctor data
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            image: imageUrl,
            about,
            fees,
            address,
            date: Date.now(),
            available: true,
        };

        // 7️⃣ Save to MongoDB
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({ success: true, message: "Doctor registered successfully", data: newDoctor });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// admin login
const loginAdmin = async(req,res) => {
    
    try{

        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true, token});
        }

    } catch(error) {
        console.log(error);
        res.json({success:false, message:"wrong admin credentials"});
    }
}

   



export { addDoctor, loginAdmin };