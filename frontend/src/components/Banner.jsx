import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-blue-500 rounded-lg px-6 sm:px-10 md:px-14 lg:px-20 py-10 md:py-16  lg:py-20 my-20 text-white overflow-hidden ">
      
      {/* 🌟 Left Side */}
      <div className="flex-1 flex flex-col gap-4 text-center md:text-left md:items-start">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
          <p>Book Appointment</p>
          <p className="mt-2 text-white/90">With 100+ Trusted Doctors</p>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="bg-white text-blue-600 text-sm sm:text-base px-6 py-3 mt-4 rounded-full font-medium hover:scale-105 hover:bg-blue-100 transition duration-300 w-fit mx-auto md:mx-0"
        >
          Create Account
        </button>
      </div>

      {/* 💊 Right Side */}
      <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
        <img
          src={assets.appointment_img}
          alt="appointment banner"
          className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto object-contain drop-shadow-lg"
        />
      </div>
    </div>
  );
};

export default Banner;