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

  const highlightedDoctors = doctors.slice(0, 8);

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-12">
      <div className="text-center mb-10 space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-blue-500/70">
          Top Rated
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold">
          Doctors Patients Love
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real-time availability, detailed profiles, and lightning-fast bookings for the most trusted specialists.
        </p>
      </div>

      {highlightedDoctors.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-200 bg-white/60 py-16 text-center text-gray-500">
          Doctor list will appear here as soon as it loads.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {highlightedDoctors.map((item) => (
            <button
              type="button"
              key={item._id}
              onClick={() => navigate(`/appointments/${item._id}`)}
              className="text-left bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-2xl border border-blue-100"
                />
                <div>
                  <p className="font-semibold text-lg text-gray-900">{item.name}</p>
                  <p className="text-sm text-blue-600 font-medium">{item.speciality}</p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 px-4 py-3 flex items-center justify-between text-sm font-medium">
                <span className="text-gray-500">Status</span>
                <span className={`${item.available ? "text-green-600" : "text-red-500"}`}>
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Consultation</span>
                <span className="font-semibold text-gray-900">
                  {item.fees ? `₹${item.fees}` : "Included"}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            navigate("/doctors");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:shadow-lg text-white px-8 py-3 rounded-full font-medium transition"
        >
          Explore All Doctors
        </button>
      </div>
    </section>
  );
}

export default TopDoctors;