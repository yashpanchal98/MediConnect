import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <footer className="bg-white text-gray-800 px-6 sm:px-10 md:px-16 lg:px-24 py-12 border-t border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-20">
        
        {/* 🩶 Left Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={assets.logo}
            alt="logo"
            className="w-40 mb-4 cursor-pointer hover:scale-105 transition-transform duration-300"
          />
          <p className="text-sm text-gray-600 max-w-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. We help you find trusted doctors easily.
          </p>
        </div>

        {/* 🏢 Center Section */}
        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold text-lg mb-3 text-brown-700">Company</p>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Home</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Contact Us</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* 📞 Right Section */}
        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold text-lg mb-3 text-brown-700">Get In Touch</p>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-blue-600 transition-colors">+91 72248xxxxx</li>
            <li className="hover:text-blue-600 transition-colors">panchalyash2302@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* 🔹 Bottom Section */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;