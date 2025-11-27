import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { axiosInstance } from "../../api/axios";
import { toast } from "react-toastify";

function DoctorDashboard() {
  const { dToken } = useContext(DoctorContext);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchDoctorProfile();
    fetchAppointments();
  }, []);

  // 🔹 Appointment Status
  const getStatus = (slotDate, slotTime) => {
    const apptDateTime = new Date(`${slotDate} ${slotTime}`);
    if (isNaN(apptDateTime)) return "Unknown";
    return apptDateTime < new Date() ? "Fulfilled" : "Active";
  };

  // 🔹 Fetch doctor profile
  const fetchDoctorProfile = async () => {
    try {
      const token = dToken || localStorage.getItem("dToken");
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const doctorId = decoded.id;

      const { data } = await axiosInstance.get(
        `/api/v1/doctor/get-profile/${doctorId}`
      );

      if (data.success) {
        setDoctor(data.doctor);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load doctor dashboard");
    }
  };

  // 🔹 Fetch appointments
  const fetchAppointments = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/doctor/appointments");
      if (data.success) setAppointments(data.appointments);
    } catch (err) {
      console.log(err);
    }
  };

  if (!doctor) {
    return <p className="text-center mt-20 text-gray-600">Loading Dashboard...</p>;
  }

  // Separate Active & Fulfilled
  const upcoming = appointments.filter(
    (a) => getStatus(a.slotDate, a.slotTime) === "Active"
  );
  const past = appointments.filter(
    (a) => getStatus(a.slotDate, a.slotTime) === "Fulfilled"
  );

  return (
    <div className="flex">

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-blue-600 text-white rounded-xl shadow">
            <h3>Total Appointments</h3>
            <p className="text-3xl font-bold mt-2">{appointments.length}</p>
          </div>

          <div className="p-6 bg-green-600 text-white rounded-xl shadow">
            <h3>Total Earnings</h3>
            <p className="text-3xl font-bold mt-2">
              ₹ {appointments.filter(a => a.payment).length * doctor.fees}
            </p>
          </div>

          <div
            className={`p-6 rounded-xl shadow text-white ${
              doctor.available ? "bg-purple-600" : "bg-red-500"
            }`}
          >
            <h3>Availability</h3>
            <p className="text-3xl font-bold mt-2">
              {doctor.available ? "Available" : "Not Available"}
            </p>
          </div>
        </div>

        {/* UPCOMING APPOINTMENTS */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>

          {upcoming.length === 0 ? (
            <p className="text-gray-500">No upcoming appointments</p>
          ) : (
            <div className="space-y-4">
              {upcoming.map((appt) => (
                <div
                  key={appt._id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {appt.userData?.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {appt.slotDate} • {appt.slotTime}
                    </p>
                  </div>

                  <p
                    className={`px-3 py-1 rounded text-white ${
                      appt.payment ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {appt.payment ? "Paid" : "Pending"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAST APPOINTMENTS */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>

          {past.length === 0 ? (
            <p className="text-gray-500">No past appointments</p>
          ) : (
            <div className="space-y-4">
              {past.map((appt) => (
                <div
                  key={appt._id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {appt.userData?.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {appt.slotDate} • {appt.slotTime}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded bg-gray-600 text-white">
                    Fulfilled
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DoctorDashboard;