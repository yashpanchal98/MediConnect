import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

function Dashboard() {
  const { getDashboardStats, getTodayAppointments } = useContext(AdminContext);

  const [stats, setStats] = useState(null);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const statsRes = await getDashboardStats();
      const todayRes = await getTodayAppointments();

      if (statsRes.success) setStats(statsRes.data);
      else toast.error("Failed to load dashboard stats");

      if (todayRes.success) setTodayAppointments(todayRes.appointments);
      else toast.error("Failed to load today's appointments");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-lg text-gray-600">Loading dashboard...</div>
    );

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      {/* -------- Stats Cards -------- */}
      {/* -------- Stats Cards -------- */}
<div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">

  <div className="bg-white shadow-md p-6 rounded-xl">
    <p className="text-sm text-gray-600">Total Users</p>
    <h3 className="text-2xl font-bold text-blue-600">
      {stats?.totalUsers || 0}
    </h3>
  </div>

  <div className="bg-white shadow-md p-6 rounded-xl">
    <p className="text-sm text-gray-600">Total Doctors</p>
    <h3 className="text-2xl font-bold text-green-600">
      {stats?.totalDoctors || 0}
    </h3>
  </div>

  <div className="bg-white shadow-md p-6 rounded-xl">
    <p className="text-sm text-gray-600">Total Appointments</p>
    <h3 className="text-2xl font-bold text-purple-600">
      {stats?.totalAppointments || 0}
    </h3>
  </div>

  <div className="bg-white shadow-md p-6 rounded-xl">
    <p className="text-sm text-gray-600">Total Earnings</p>
    <h3 className="text-2xl font-bold text-emerald-600">
      ₹{stats?.totalEarnings || 0}
    </h3>
  </div>

</div>

      {/* -------- Today's Appointments -------- */}
      <h3 className="text-xl font-semibold mb-4">Today's Appointments</h3>

      {todayAppointments.length === 0 ? (
        <p className="text-gray-500">No appointments today</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map((item, index) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.userData?.name}</td>
                  <td className="px-4 py-3">{item.docData?.name}</td>
                  <td className="px-4 py-3">
                    {item.slotDate} • {item.slotTime}
                  </td>
                  <td className="px-4 py-3">
                    {item.cancelled ? (
                      <span className="text-red-500 font-medium">Cancelled</span>
                    ) : item.payment ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pending</span>
                    )}
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

export default Dashboard;