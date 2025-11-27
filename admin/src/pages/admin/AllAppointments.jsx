import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../../api/axios";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

function AllAppointments() {
  const { adminToken } = useContext(AdminContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const markPaymentAsPaid = async (appointmentId) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/v1/admin/update-payment",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      if (data.success) {
        toast.success("Payment updated to Paid");
        fetchAppointments();
      } else {
        toast.error("Failed to update payment");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating payment");
    }
  };

  const fetchAppointments = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/admin/appointments", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

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

  const getStatus = (slotDate, slotTime) => {
    const apptDateTime = new Date(`${slotDate} ${slotTime}`);
    return apptDateTime < new Date() ? "Fulfilled" : "Active";
  };

  // ⭐ AUTOMATE PAYMENT UPDATE after table is rendered
  useEffect(() => {
    appointments.forEach((appt) => {
      const status = getStatus(appt.slotDate, appt.slotTime);

      if (status === "Fulfilled" && !appt.payment) {
        markPaymentAsPaid(appt._id);
      }
    });
    // eslint-disable-next-line
  }, [appointments]);

  useEffect(() => {
    fetchAppointments();
  }, []);

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
                <td colSpan="8" className="text-center text-gray-600 py-6 text-sm">
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((appt, index) => {
                const status = getStatus(appt.slotDate, appt.slotTime);

                return (
                  <tr
                    key={appt._id}
                    className="border text-sm hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 border">{index + 1}</td>

                    <td className="px-4 py-3 border">
                      Dr. {appt.docData?.name || "Unknown"}
                    </td>

                    <td className="px-4 py-3 border">
                      {appt.userData?.name || "Unknown"}
                    </td>

                    <td className="px-4 py-3 border">{appt.slotDate}</td>

                    <td className="px-4 py-3 border">{appt.slotTime}</td>

                    <td className="px-4 py-3 border">Rs. {appt.amount}</td>

                    {/* Payment Column */}
                    <td className="px-4 py-3 border">
                      {appt.payment ? (
                        <span className="text-green-600 font-semibold">Paid</span>
                      ) : (
                        <span className="text-red-500 font-medium">Pending</span>
                      )}
                    </td>

                    {/* Status column */}
                    <td className="px-4 py-3 border">
                      {appt.cancelled ? (
                        <span className="text-red-600 font-semibold">Cancelled</span>
                      ) : (
                        <span
                          className={`px-2 py-1 text-sm rounded-md ${
                            status === "Fulfilled"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {status}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAppointments;