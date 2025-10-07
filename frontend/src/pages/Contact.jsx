import React from "react";
import { Mail, Phone, MapPin } from "lucide-react"; // lightweight icons

function Contact() {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Contact <span className="text-blue-500">Us</span>
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          We’re here to help. Reach out with any questions, feedback, or
          inquiries — our team will respond promptly.
        </p>
      </div>

      {/* Contact Info + Form */}
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Left: Contact Info */}
        <div className="md:w-1/3 bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Our Office</p>
              <p className="text-gray-600">
                123 Health Street, MedCity, New York, USA
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Call Us</p>
              <p className="text-gray-600">+1 (212) 456-7890</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-gray-600">support@prescripto.com</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="md:w-2/3 bg-white p-8 rounded-xl shadow-lg">
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;