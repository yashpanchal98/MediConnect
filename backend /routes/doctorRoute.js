import express from 'express';
import { doctorList } from '../controllers/doctorController.js';
import { getDoctorById } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.get("/:doctorId", getDoctorById);

export default doctorRouter;