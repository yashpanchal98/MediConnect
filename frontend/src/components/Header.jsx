import React from "react";
import { assets } from "../assets/assets";

function Header() {
  return (
    <div className="my-10 flex flex-col md:flex-row items-center justify-between rounded-3xl px-6 md:px-10 lg:px-16 py-10 md:py-16 text-white overflow-hidden relative bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500">
      
      <div className="absolute inset-y-0 -right-20 w-64 md:w-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      
      {/* 🩺 Left Side */}
      <div className="flex flex-col gap-5 md:w-1/2 text-center md:text-left">
        <p className="text-sm uppercase tracking-[0.3em] text-white/80">Trusted Care, Anytime</p>
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

        <div className="flex flex-col sm:flex-row gap-3 items-center md:items-start justify-center md:justify-start">
          <a
            href="#speciality"
            className="flex items-center justify-center md:justify-start gap-2 bg-white text-blue-600 font-medium px-8 py-3 rounded-full w-fit mx-auto md:mx-0 hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Book Appointment
            <img className="w-3" src={assets.arrow_icon} alt="arrow" />
          </a>
          <span className="text-sm text-blue-50 max-w-xs">
            Available 24/7 • 120+ verified specialists • Live slot updates
          </span>
        </div>
      </div>

      {/* 💊 Right Side */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
        <img
          className="w-full max-w-md md:max-w-lg h-auto object-contain drop-shadow-2xl"
          src={assets.header_img}
          alt="header"
        />
        <div className="absolute -bottom-6 right-4 bg-white text-blue-600 rounded-2xl px-4 py-3 shadow-xl hidden sm:flex flex-col text-sm font-semibold">
          <span>Instant Booking</span>
          <span className="text-xs font-normal text-gray-500">Under 2 mins</span>
        </div>
      </div>
    </div>
  );
}

export default Header;