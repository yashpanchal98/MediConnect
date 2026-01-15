import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import authDoctor from "../middleware/authDoctor.js";
import { v2 as cloudinary } from 'cloudinary';

// getting detail of each doctor 
const getDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await doctorModel.findById(doctorId);
    console.log(doctor);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });

  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// changing the availability of doctors
const changeAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Find the doctor
    const docData = await doctorModel.findById(doctorId);

    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Toggle the availability
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { available: !docData.available },
      { new: true } // returns the updated document
    );

    res.json({
      success: true,
      message: "Availability Changed...",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Fetches all the Doctors 
const doctorList = async (req, res) => {
  try {

    const doctors = await doctorModel.find({}).select(['-password', '-email']);
    res.json({ success: true, doctors })

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// API for login doctor
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({
        success: false,
        message: "Doctor not found. Invalid credentials."
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        speciality: doctor.speciality
      }
    });

  } catch (error) {
    console.error("Login doctor error:", error);
    res.json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};

// API TO GET ALL APPOINTMENTS OF A PARTICULAR DOCTOR
const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.doctorId; // coming from authDoctor middleware
    console.log(doctorId);

    const appointments = await appointmentModel
      .find({ docId: doctorId })
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      message: "Doctor appointments fetched",
      appointments,
    });
  } catch (error) {
    console.error("Get Doctor Appointments Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
    });
  }
};


// UPDATE DOCTOR PROFILE
const updateDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // 🔹 Update simple text fields
    const { name, phone, speciality, fees, about, gender, dob } = req.body;

    if (name) doctor.name = name;
    if (phone) doctor.phone = phone;
    if (speciality) doctor.speciality = speciality;
    if (fees) doctor.fees = fees;
    if (about) doctor.about = about;
    if (gender) doctor.gender = gender;
    if (dob) doctor.dob = dob;

    // 🔹 Update address object
    if (req.body.address) {
      const address = JSON.parse(req.body.address);
      doctor.address = address;
    }

    // 🔹 Update image if uploaded
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "doctor_images",
      });

      doctor.image = uploadResult.secure_url; 
    }

    await doctor.save();

    res.json({
      success: true,
      message: "Doctor profile updated successfully",
      doctor,
    });

  } catch (error) {
    console.error("Update Doctor Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update doctor profile",
    });
  }
};


export { changeAvailability, doctorList, getDoctorById, loginDoctor, getDoctorAppointments, updateDoctorProfile };
