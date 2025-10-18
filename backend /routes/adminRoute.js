import express from "express";
import {addDoctor, allDoctors} from "../controllers/adminController.js";
import { loginAdmin } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post('/login',loginAdmin);
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor);
adminRouter.get("/all-doctors",authAdmin,allDoctors);
adminRouter.post("/change-availability/:doctorId",authAdmin,changeAvailability);

export default adminRouter;