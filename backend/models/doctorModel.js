import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { type: String },
        speciality: { type: String, required: true },
        degree: { type: String, required: true },
        experience: { type: String, required: true },
        about: { type: String, required: true },
        available: { type: Boolean, default: true },
        fees: { type: Number, required: true },
        address: { type: Object },
        date: { type: Number, required: true },
        slots_booked: { type: Array, default: {} },
    },
    { minimize: false }
);

const doctorModel = mongoose.model("Doctor", doctorSchema) 

export default doctorModel;