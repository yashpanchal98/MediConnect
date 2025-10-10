import express from "express";
import {addDoctor} from "../controllers/adminController.js";
import { loginAdmin } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post('/login',loginAdmin);
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor);

export default adminRouter;