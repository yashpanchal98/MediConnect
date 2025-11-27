import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { axiosInstance } from "../../api/axios";
import { toast } from "react-toastify";

function DoctorAppointment() {
  const { dToken } = useContext(DoctorContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctor appointments
  const fetchDoctorAppointments = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get("/api/v1/doctor/appointments");

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error("Failed to load appointments");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  // Determine status
  const getStatus = (slotDate, slotTime, isCompleted, cancelled) => {
    if (cancelled) return "Cancelled";
    if (isCompleted) return "Completed";

    const apptDateTime = new Date(`${slotDate} ${slotTime}`);
    return apptDateTime < new Date() ? "Fulfilled" : "Pending";
  };

  useEffect(() => {
    if (dToken) fetchDoctorAppointments();
  }, [dToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 text-lg">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Appointments</h2>

      {appointments.length === 0 ? (
        <div className="p-6 bg-white rounded-2xl shadow text-center text-gray-500">
          No appointments found
        </div>
      ) : (
        <div className="bg-white shadow rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-gray-700 font-semibold">Patient</th>
                <th className="p-4 text-gray-700 font-semibold">Date</th>
                <th className="p-4 text-gray-700 font-semibold">Time</th>
                <th className="p-4 text-gray-700 font-semibold">Payment</th>
                <th className="p-4 text-gray-700 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr
                  key={appt._id}
                  className={`transition hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {/* Patient */}
                  <td className="p-4 text-gray-800 font-medium capitalize">
                    {appt.userData?.name || "N/A"}
                  </td>

                  {/* Date */}
                  <td className="p-4 text-gray-700">
                    {appt.slotDate
                      ? new Date(appt.slotDate).toLocaleDateString()
                      : new Date(appt.date).toLocaleDateString()}
                  </td>

                  {/* Time */}
                  <td className="p-4 text-gray-700">{appt.slotTime || "N/A"}</td>

                  {/* Payment */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        appt.payment
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {appt.payment ? "Paid" : "Unpaid"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-4 font-medium capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        getStatus(appt.slotDate, appt.slotTime, appt.isCompleted, appt.cancelled) ===
                        "Fulfilled"
                          ? "bg-green-100 text-green-700"
                          : getStatus(
                              appt.slotDate,
                              appt.slotTime,
                              appt.isCompleted,
                              appt.cancelled
                            ) === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {getStatus(appt.slotDate, appt.slotTime, appt.isCompleted, appt.cancelled)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DoctorAppointment;