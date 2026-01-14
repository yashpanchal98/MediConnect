import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <footer className="mt-20 rounded-3xl bg-slate-900 text-slate-100 px-6 sm:px-10 md:px-16 lg:px-24 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* 🩶 Left Section */}
        <div className="flex flex-col gap-3">
          <img
            src={assets.logo}
            alt="logo"
            className="w-40 mb-2 cursor-pointer"
          />
          <p className="text-sm text-slate-300 max-w-sm">
            Prescripto connects patients with vetted doctors, enabling instant booking, secure payments, and reliable follow-ups.
          </p>
        </div>

        {/* 🏢 Center Section */}
        <div>
          <p className="font-semibold text-lg mb-4 text-white">Company</p>
          <ul className="space-y-2 text-slate-300">
            {["Home", "About Us", "Contact Us", "Privacy Policy"].map((item) => (
              <li key={item} className="hover:text-white transition-colors cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* 📚 Resources */}
        <div>
          <p className="font-semibold text-lg mb-4 text-white">Resources</p>
          <ul className="space-y-2 text-slate-300">
            <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
            <li className="hover:text-white transition-colors cursor-pointer">For Doctors</li>
            <li className="hover:text-white transition-colors cursor-pointer">Community</li>
          </ul>
        </div>

        {/* 📞 Right Section */}
        <div>
          <p className="font-semibold text-lg mb-4 text-white">Get In Touch</p>
          <ul className="space-y-2 text-slate-200">
            <li className="hover:text-white transition-colors">+91 72248xxxxx</li>
            <li className="hover:text-white transition-colors">panchalyash2302@gmail.com</li>
          </ul>
          <p className="text-xs text-slate-400 mt-4">
            Mon - Sat · 9am – 8pm IST
          </p>
        </div>
      </div>

      {/* 🔹 Bottom Section */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Prescripto. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;