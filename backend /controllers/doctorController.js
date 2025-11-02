import doctorModel from "../models/doctorModel.js";

// getting detail of each doctor 
const getDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await doctorModel.findById(doctorId);

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

    const doctors = await doctorModel.find({}).select(['-password','-email']); 
    res.json({success:true, doctors})

  } catch (error) {
    res.json({success:false, message:error.message});
  }
}

export { changeAvailability , doctorList, getDoctorById};
