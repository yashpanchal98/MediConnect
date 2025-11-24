import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import { axiosInstance } from "../../api/axios";

function DoctorAppointment() {
  const { dToken } = useContext(DoctorContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctor appointments
  const fetchDoctorAppointments = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(
        "/api/v1/doctor/appointments",
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );

      console.log(data);

      if(data.success) {
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

  useEffect(() => {
    if (dToken) {
      fetchDoctorAppointments();
    }
  }, [dToken]);

 return (
  <div className="p-6">
    <h2 className="text-3xl font-semibold mb-6 text-gray-800">
      My Appointments
    </h2>

    {loading ? (
      <p className="text-gray-500 text-lg">Loading appointments...</p>
    ) : appointments.length === 0 ? (
      <div className="p-6 bg-white rounded-xl shadow text-center text-gray-500">
        No appointments found
      </div>
    ) : (
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full border-collapse text-left">
         <thead className="bg-gray-100 border-b">
  <tr>
    <th className="p-4 font-medium text-gray-700">Patient</th>
    <th className="p-4 font-medium text-gray-700">Date</th>
    <th className="p-4 font-medium text-gray-700">Time</th>
    <th className="p-4 font-medium text-gray-700">Payment</th>
    <th className="p-4 font-medium text-gray-700">Status</th>
  </tr>
</thead>

<tbody>
  {appointments.map((appt, index) => (
    <tr
      key={appt._id}
      className={`border-b transition ${
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      } hover:bg-gray-100`}
    >
      {/* Patient Name */}
      <td className="p-4 capitalize text-gray-800">
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
      <td
        className={`p-4 font-medium capitalize ${
          appt.isCompleted
            ? "text-green-600"
            : appt.cancelled
            ? "text-red-600"
            : "text-yellow-600"
        }`}
      >
        {appt.isCompleted
          ? "completed"
          : appt.cancelled
          ? "cancelled"
          : "pending"}
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