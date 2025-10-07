import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      className="flex min-h-screen flex-col items-center gap-3 py-16 mt-10 text-gray-800"
      id="speciality"
    >
      <h1 className="text-2xl font-bold">Find by Speciality</h1>
      <p className="text-center max-w-xl">
        Simply browse through our extensive list of trusted doctors, and schedule
        your appointment with ease.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  mt-6">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-24 h-24 object-contain mb-2"
            />
            <p className="font-medium capitalize">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;