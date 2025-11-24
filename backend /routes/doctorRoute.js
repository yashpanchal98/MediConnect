import express from 'express';
import { doctorList, getDoctorAppointments, updateDoctorProfile} from '../controllers/doctorController.js';
import { getDoctorById, loginDoctor } from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';
import upload from "../middleware/multer.js";

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.get("/appointments", authDoctor, getDoctorAppointments);
doctorRouter.get("/get-profile/:doctorId", authDoctor, getDoctorById);
doctorRouter.get("/:doctorId",getDoctorById);
doctorRouter.post(
  "/update-profile/:doctorId",
  authDoctor,
  upload.single("image"),
  updateDoctorProfile
);
doctorRouter.post("/login", loginDoctor);


export default doctorRouter;