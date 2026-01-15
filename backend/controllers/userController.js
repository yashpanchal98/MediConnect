import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    //  Validate password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password (min 8 chars)" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    //  Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  Create user object
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    // Save to DB
    const newUser = new userModel(userData);
    const user = await newUser.save();

    //  Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //  Send success response
    res.json({ success: true, token });

  } catch (error) {
    console.error("Register error:", error);
    res.json({ success: false, message: error.message });
  }

};

// API for user LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if both fields are provided
    if (!email || !password) {
      return res.json({ success: false, message: "Please enter all fields" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    //Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    //If password matches, create token
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }

  } catch (error) {
    console.error("Login error:", error);
    res.json({ success: false, message: error.message });
  }
};


// API TO GET PROFILE DATA

const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//  update profile controller
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // ✅ comes from token, not body
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    // Basic validation
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const updateData = {
      name,
      phone,
      dob,
      gender,
      address: address ? JSON.parse(address) : {},
    };

    // Handle image file upload
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    // ✅ Ensure DB is actually updated
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API of appointment booking Appointment Controller
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.userId; // ✅ from auth middleware

    // 🧩 Validation
    if (!userId || !docId || !slotDate || !slotTime) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // ✅ Check doctor
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // ✅ Check doctor availability
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    // ✅ Check if the slot is already booked
    const existingAppointment = await appointmentModel.findOne({
      docId,
      slotDate,
      slotTime,
      cancelled: false,
    });

    if (existingAppointment) {
      return res.json({
        success: false,
        message: "This time slot is already booked. Please choose another slot.",
      });
    }

    // ✅ Get user data (exclude password)
    const userData = await userModel.findById(userId).select("-password");

    // ✅ Prepare appointment data
    const appointmentData = {
      userId,
      docId,
      userData: {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      },
      docData: {
        _id: docData._id,
        name: docData.name,
        speciality: docData.speciality,
        image: docData.image,
        fees: docData.fees,
      },
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    // ✅ Save new appointment
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // ✅ Add this slot to doctor’s booked slots
    await doctorModel.findByIdAndUpdate(
      docId,
      {
        $push: { [`slots_booked.${slotDate}`]: slotTime }, // ✅ PUSH instead of SET
      },
      { new: true, upsert: true }
    );

    // ✅ Respond success
    res.json({
      success: true,
      message: "Appointment booked successfully!",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("❌ Book appointment error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Api of showing all booked appointments {my-appointments frontend page}
const listAppointments = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const appointments = await appointmentModel
      .find({ userId })
      .sort({ date: -1 }); // newest first

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel the appointments
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

    if (!appointmentId) {
      return res.json({ success: false, message: "Appointment ID required" });
    }

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    if (appointment.cancelled) {
      return res.json({ success: false, message: "Already cancelled" });
    }

    // ✅ Cancel appointment
    appointment.cancelled = true;
    await appointment.save();

    // ✅ Free doctor slot
    const doctor = await doctorModel.findById(appointment.docId);
    const { slotDate, slotTime } = appointment;

    if (doctor && doctor.slots_booked) {
      const normalizedTime = slotTime.toLowerCase().trim();

      if (doctor.slots_booked[slotDate]) {
        doctor.slots_booked[slotDate] = doctor.slots_booked[slotDate].filter(
          (t) => t.toLowerCase().trim() !== normalizedTime
        );

        if (doctor.slots_booked[slotDate].length === 0) {
          delete doctor.slots_booked[slotDate];
        }
      }

      await doctor.save();
    }

    res.json({
      success: true,
      message: "Appointment cancelled and slot re-opened",
    });
  } catch (error) {
    console.error("Cancel appointment error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Razorpay Instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_TEST_API_KEY,
  key_secret: process.env.RAZORPAY_TEST_KEY_SECRET
})

// API TO MAKE PAYMENT OF APPOINTMENT USING RAZORPAY
const paymentRazorpay = async (req, res) => {

  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment cancelled or Appointment not found" });
    }

    // creating options for the razorpay payment
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId
    }
    
    // creating an order
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });

  } catch (error) {
    console.error("Cancel appointment error:", error);
    res.json({ success: false, message: error.message });
  }
}

// API to verify payment of razorpay
const verifyRazorpay = async(req,res) => {

  try{

    const {razorpay_order_id} = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    console.log(orderInfo);

    if(orderInfo.status === 'paid'){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      res.json({success:true, message:"Payment Successful"});
    } else {
       res.json({success:true, message:"Payment Failed"});
    }

  } catch(error){

     res.json({success:false, message:error.message});

  }
}


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment, paymentRazorpay, verifyRazorpay };