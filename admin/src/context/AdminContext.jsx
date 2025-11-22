import { createContext, useState } from "react";
import { axiosInstance } from "../api/axios";

export const AdminContext = createContext();

// Create the provider component
const AdminContextProvider = (props) => {

  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ------------------------
  // API CALLS
  // ------------------------

  // Dashboard Stats
  const getDashboardStats = async () => {
    try {
      const { data } = await axiosInstance.get(
        "/api/v1/admin/dashboard-stats",
        {
          headers: { Authorization: `Bearer ${aToken}` }
        }
      );
      return data;
    } catch (err) {
      console.log("Dashboard stats error:", err);
      return { success: false };
    }
  };

  // Today's Appointments
  const getTodayAppointments = async () => {
    try {
      const { data } = await axiosInstance.get(
        "/api/v1/admin/dashboard-today-appointments",
        {
          headers: { Authorization: `Bearer ${aToken}` }
        }
      );
      return data;
    } catch (err) {
      console.log("Today appointments error:", err);
      return { success: false };
    }
  };

  // Values provided to components
  const value = {
    aToken, setAToken,
    backendUrl,
    getDashboardStats,
    getTodayAppointments
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;