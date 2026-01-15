import express from "express";
import {addDoctor, allDoctors} from "../controllers/adminController.js";
import { loginAdmin, appointmentsAdmin, getDashboardStats, getTodayAppointments, updatePaymentStatus } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailability} from "../controllers/doctorController.js";


const adminRouter = express.Router();

adminRouter.post('/login',loginAdmin);
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor);
adminRouter.get("/all-doctors",authAdmin,allDoctors);
adminRouter.put("/change-availability/:doctorId",authAdmin,changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.get("/dashboard-stats", authAdmin, getDashboardStats);
adminRouter.get("/dashboard-today-appointments", authAdmin, getTodayAppointments);
adminRouter.post("/update-payment", authAdmin, updatePaymentStatus);


export default adminRouter;