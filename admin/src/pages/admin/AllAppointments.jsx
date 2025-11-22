import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../../api/axios";
import { AdminContext } from "../../context/AdminContext"; 
import { toast } from "react-toastify";

function AllAppointments() {
  const { adminToken } = useContext(AdminContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchAppointments = async () => {
    try {
      const { data } = await axiosInstance.get(
        "/api/v1/admin/appointments", 
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message || "Failed to load appointments");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ============================
  // UI
  // ============================
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-blue-600 text-lg">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        All Appointments - {appointments.length}
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="px-4 py-3 border">Sr.</th>
              <th className="px-4 py-3 border">Doctor</th>
              <th className="px-4 py-3 border">Patient</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border">Time</th>
              <th className="px-4 py-3 border">Fees</th>
              <th className="px-4 py-3 border">Payment</th>
              <th className="px-4 py-3 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-600 py-6 text-sm"
                >
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((appt,index) => (
                <tr
                  key={appt._id}
                  className="border text-sm hover:bg-gray-50 transition"
                >
                   <td className="px-4 py-3 border font-medium">
                    {index+1}
                  </td>

                  <td className="px-4 py-3 border font-medium">
                    Dr. {appt.docData?.name || "Unknown"}
                  </td>

                  <td className="px-4 py-3 border">
                    {appt.userData?.name || "Unknown"}
                  </td>

                  <td className="px-4 py-3 border">{appt.slotDate}</td>

                  <td className="px-4 py-3 border">{appt.slotTime}</td>

                  <td className="px-4 py-3 border">Rs. {appt.amount}</td>

                  <td className="px-4 py-3 border">
                    {appt.payment ? (
                      <span className="text-green-600 font-semibold">
                        Paid
                      </span>
                    ) : (
                      <span className="text-red-500 font-medium">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 border">
                    {appt.cancelled ? (
                      <span className="text-red-600 font-semibold">
                        Cancelled
                      </span>
                    ) : (
                      <span className="text-blue-600 font-semibold">
                        Active
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAppointments;