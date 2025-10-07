import React from "react";
import { doctors } from "../assets/assets";

function MyAppointments() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 sm:px-10 py-10">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        My Appointments
      </h2>

      {/* Appointments List */}
      <div className="space-y-6">
        {doctors.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 hover:shadow-lg transition"
          >
            {/* Doctor Image */}
            <div className="w-28 h-28 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Appointment Details */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.speciality}</p>

              <div className="mt-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-700">Address:</span>{" "}
                  {item.address?.line2 || "Clinic Address Unavailable"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Date & Time:
                  </span>{" "}
                  25 July 2024 • 8:30 PM
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 sm:ml-auto">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Pay Online
              </button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;