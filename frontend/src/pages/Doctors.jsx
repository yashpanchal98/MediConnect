import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doctors } from "../assets/assets";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    applyFilter();
  }, [speciality]);

  const applyFilter = () => {
    if (speciality) {
      const filtered = doctors.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
      setFilterDoc(filtered);
    } else {
      setFilterDoc(doctors);
    }
  };

  // all available specialities
  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div className="px-6 md:px-12 py-10">
      <p className="text-gray-600 text-center text-lg mb-8">
        Browse through the list of trusted doctors by their specialties.
      </p>

      <div className="flex flex-col md:flex-row gap-10">
        {/* 🩺 Left Sidebar */}
        <div className="md:w-1/4 space-y-3">
          <p className="font-semibold text-gray-700 mb-2">Specialities</p>
          {specialities.map((item, index) => {
            const isActive =
              speciality &&
              speciality.toLowerCase() === item.toLowerCase();
            return (
              <Link
                key={index}
                to={`/doctors/${item.toLowerCase()}`}
                className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        {/* 🧑‍⚕️ Right Doctor Grid */}
        <div  className="flex flex-wrap gap-6 justify-center md:justify-start flex-1">
          {filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <div onClick={()=> navigate(`/appointments/${item._id}`)}
                key={index}
                className="border p-4 rounded-lg shadow-md w-56 hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.speciality}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">
              No doctors found for "{speciality}".
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;