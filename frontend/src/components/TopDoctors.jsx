import React from "react";
import { doctors } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function TopDoctors() {

    const navigate = useNavigate();

  return (
    <div className="py-10 px-6 md:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
          Top Doctors to Book
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.slice(0,10).map((item, index) => (
          <div onClick={()=>navigate(`/appointments/${item._id}`)}
            key={index}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform duration-200"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <div className="text-center">
              <p className="font-medium text-lg">{item.name}</p>
              <p className="text-blue-600 font-medium mb-2">{item.speciality}</p>
              <p className="text-green-600 text-sm">Available</p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-8">
        <button onClick={()=> {navigate('/doctors'); scrollTo(0,0) }} className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-200">
          See More
        </button>
      </div>
    </div>
  );
}

export default TopDoctors;