import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  // ✅ Fetch appointments
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axiosInstance.get("/api/v1/user/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message || "Failed to load appointments");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ✅ Cancel Appointment Logic
  const cancelAppointment = async (appointmentId) => {
    try {
      setCancellingId(appointmentId);

      const token = localStorage.getItem("token");

      const { data } = await axiosInstance.post(
        "/api/v1/user/cancel-appointment",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Appointment cancelled");

        // ✅ Update UI instantly
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === appointmentId
              ? { ...appt, cancelled: true }
              : appt
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to cancel appointment");
      console.error(error);
    } finally {
      setCancellingId(null);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-blue-600">
        Loading appointments...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-6 sm:px-10 py-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments booked yet.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 hover:shadow-lg transition"
            >
              {/* Doctor Image */}
              <div className="w-28 h-28 flex-shrink-0">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Appointment Details */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.docData.name}
                </h3>
                <p className="text-sm text-gray-500">{item.docData.speciality}</p>

                <div className="mt-2 text-sm text-gray-600">
                  {/* Address */}
                  <p>
                    <span className="font-medium text-gray-700">Address:</span>{" "}
                    {item.docData.address?.line1
                      ? `${item.docData.address.line1}, ${item.docData.address.line2}`
                      : "Clinic Address Unavailable"}
                  </p>

                  {/* Date & Time */}
                  <p>
                    <span className="font-medium text-gray-700">Appointment:</span>{" "}
                    {item.slotDate} • {item.slotTime}
                  </p>

                  {/* Cancelled Label */}
                  {item.cancelled && (
                    <p className="mt-1 text-red-500 font-semibold">
                      Appointment Cancelled
                    </p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 sm:ml-auto">
                <button
                  disabled={item.cancelled}
                  className={`px-4 py-2 rounded-md transition ${
                    item.cancelled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Pay Online
                </button>

                <button
                  disabled={item.cancelled || cancellingId === item._id}
                  onClick={() => cancelAppointment(item._id)}
                  className={`px-4 py-2 rounded-md border transition ${
                    item.cancelled
                      ? "border-gray-400 text-gray-400 cursor-not-allowed"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {cancellingId === item._id ? "Cancelling..." : "Cancel"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;