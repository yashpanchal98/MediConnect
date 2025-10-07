import React from "react";
import { assets } from "../assets/assets";

function Header() {
  return (
    <div className="my-10 flex flex-col md:flex-row items-center justify-between bg-blue-500 rounded-lg px-6 md:px-10 lg:px-20 py-10 md:py-16 text-white overflow-hidden">
      
      {/* 🩺 Left Side */}
      <div className="flex flex-col gap-5 md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </h1>

        <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 text-sm font-light text-white/90">
          <img
            className="w-28"
            src={assets.group_profiles}
            alt="group profiles"
          />
          <p className="max-w-xs">
            Simply browse through our extensive list of trusted doctors and schedule your appointment easily.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center justify-center md:justify-start gap-2 bg-white text-blue-600 font-medium px-8 py-3 rounded-full w-fit mx-auto md:mx-0 hover:scale-105 transition-transform duration-300 shadow-md"
        >
          Book Appointment
          <img className="w-3" src={assets.arrow_icon} alt="arrow" />
        </a>
      </div>

      {/* 💊 Right Side */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
        <img
          className="w-full max-w-md md:max-w-lg h-auto object-contain drop-shadow-lg"
          src={assets.header_img}
          alt="header"
        />
      </div>
    </div>
  );
}

export default Header;