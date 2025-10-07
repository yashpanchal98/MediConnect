import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-3xl md:text-4xl font-bold text-gray-800">
          ABOUT <span className="text-blue-500">US</span>
        </p>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Learn more about Prescripto, our mission, vision, and commitment to
          providing trusted healthcare solutions.
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={assets.about_image}
            alt="About Prescripto"
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2 space-y-4">
          <p className="text-gray-700 text-lg">
            Welcome to <span className="font-semibold">Prescripto</span>, your
            trusted partner in managing your healthcare needs. We are committed
            to excellence in healthcare technology and creating a seamless
            experience for patients and doctors alike.
          </p>

          <div>
            <p className="text-xl font-semibold text-gray-800 mb-2">Our Vision</p>
            <p className="text-gray-600">
              To create a seamless healthcare experience where patients can
              book appointments, consult doctors, and manage their health easily
              and efficiently.
            </p>
          </div>

          <div>
            <p className="text-xl font-semibold text-gray-800 mb-2">Our Mission</p>
            <p className="text-gray-600">
              To leverage technology to provide accessible, reliable, and
              user-friendly healthcare solutions for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mb-12">
        <p className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-xl font-semibold mb-2">Trusted Doctors</p>
            <p className="text-gray-600">
              Only verified and experienced doctors to ensure quality care.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-xl font-semibold mb-2">Easy Booking</p>
            <p className="text-gray-600">
              Book appointments in a few clicks, with a seamless online
              experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-xl font-semibold mb-2">Secure & Reliable</p>
            <p className="text-gray-600">
              Your data is secure with us and our platform is always reliable.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <p className="text-lg text-gray-700 mb-4">
          Ready to manage your healthcare seamlessly?
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default About;