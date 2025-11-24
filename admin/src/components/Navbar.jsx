import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="Admin Logo"
        />
        <span className="hidden sm:inline-block px-3 py-1 text-xs border rounded-full border-gray-300 text-gray-600">
          {aToken
            ? "Admin Panel"
            : dToken
              ? "Doctor Panel"
              : ""}
        </span>
      </div>

      {/* Logout Button */}
      <div>
        <button
          onClick={logout}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 sm:px-6 py-2 rounded-md transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;