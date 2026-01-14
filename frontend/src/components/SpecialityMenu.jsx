import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section
      className="min-h-[60vh] w-full rounded-3xl bg-slate-50 py-16 px-4 sm:px-6 lg:px-12 mt-10 text-gray-800 shadow-inner"
      id="speciality"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.4em] text-blue-500/80">
          Specialities
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Find the Right Doctor Faster
        </h2>
        <p className="text-gray-600">
          Browse our verified experts by speciality and jump straight into their live schedules.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            className="group rounded-2xl bg-white p-4 sm:p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all border border-transparent hover:border-blue-100 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
              <img
                src={item.image}
                alt={item.speciality}
                className="w-14 h-14 object-contain"
              />
            </div>
            <p className="font-semibold capitalize text-gray-800">{item.speciality}</p>
            <span className="text-xs text-gray-500 mt-1">Tap to explore</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;