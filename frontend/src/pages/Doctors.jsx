import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";

const Doctors = () => {
  const { speciality } = useParams();
  const [doctors, setDoctors] = useState([]); // All doctors
  const [filterDoc, setFilterDoc] = useState([]); // Filtered by speciality
  const navigate = useNavigate();

  // ✅ Fetch all doctors from backend
  const fetchDoctors = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
        // Apply filter if speciality exists
        if (speciality) {
          const filtered = data.doctors.filter(
            (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
          );
          setFilterDoc(filtered);
        } else {
          setFilterDoc(data.doctors);
        }
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // ✅ Refilter whenever speciality or doctor data changes
  useEffect(() => {
    if (doctors.length > 0) {
      if (speciality) {
        const filtered = doctors.filter(
          (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
        );
        setFilterDoc(filtered);
      } else {
        setFilterDoc(doctors);
      }
    } else {
      fetchDoctors();
    }
  }, [speciality]);

  // All available specialities
  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-blue-500/80">Browse Doctors</p>
        <h1 className="text-3xl sm:text-4xl font-semibold">Pick a speciality & meet your doctor</h1>
        <p className="text-gray-600">
          Tailored results based on what you need the most. Tap a speciality to instantly filter matching experts.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* 🩺 Left Sidebar */}
        <aside className="lg:w-1/4 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 h-fit">
          <p className="font-semibold text-gray-800 mb-4">Specialities</p>
          <div className="flex flex-wrap lg:flex-col gap-3">
            {specialities.map((item, index) => {
              const isActive =
                speciality &&
                speciality.toLowerCase() === item.toLowerCase();
              return (
                <Link
                  key={index}
                  to={`/doctors/${item.toLowerCase()}`}
                  className={`flex-1 lg:flex-none text-center lg:text-left px-4 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "bg-slate-50 text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* 🧑‍⚕️ Right Doctor Grid */}
        <div className="flex-1">
          {filterDoc.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filterDoc.map((item, index) => (
                <button
                  type="button"
                  onClick={() => navigate(`/appointments/${item._id}`)}
                  key={index}
                  className="text-left bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5 space-y-2">
                    <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                    <p className="text-blue-600 font-medium">{item.speciality}</p>
                    <p className="text-sm text-gray-500">{item.experience} yrs experience</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center text-gray-500">
              No doctors found for “{speciality}”.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctors;