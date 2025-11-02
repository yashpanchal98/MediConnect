import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";

function TopDoctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  // Fetch doctors from backend
  const getDoctorsData = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors); 
      } else {
        console.log(data.message);
        toast.error("Error while loading data ")
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
       toast.error(error.message)
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

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
        {doctors.slice(0, 10).map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/appointments/${item._id}`)}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-blue-100"
            />
            <div className="text-center">
              <p className="font-semibold text-lg text-gray-800">{item.name}</p>
              <p className="text-blue-600 font-medium mb-1">
                {item.speciality}
              </p>
              <p
                className={`text-sm font-medium ${
                  item.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.available ? "Available" : "Unavailable"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            navigate("/doctors");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition duration-200"
        >
          See More
        </button>
      </div>
    </div>
  );
}

export default TopDoctors;