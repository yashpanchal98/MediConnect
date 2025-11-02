import React, { useEffect, useState } from "react";
import { axiosFormInstance } from "../../api/axios";
import { Loader2, Stethoscope, TableRowsSplit } from "lucide-react";
import { toast } from 'react-toastify';

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axiosFormInstance.get("/api/v1/admin/all-doctors");
        setDoctors(data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Toggle availability
  const handleToggleAvailability = async (doctorId) => {
    try {
      const { data } = await axiosFormInstance.put(
        `/api/v1/admin/change-availability/${doctorId}`
      );
      const updatedDoctor = data.doctor;
      setDoctors((prev) =>
        prev.map((doc) => (doc._id === updatedDoctor._id ? updatedDoctor : doc))
      );
      toast.success("Availability Change");
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  if (loading) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/60 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center text-blue-600">
        <Loader2 className="w-10 h-10 animate-spin mb-3" />
        <p className="text-lg font-semibold">Loading Doctors...</p>
      </div>
    </div>
  );
}

  return (
    <div className="px-4 sm:px-8 py-10 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-2">
          <Stethoscope className="text-blue-600" /> Doctors List
        </h2>
        <p className="text-gray-500 text-sm mt-2 sm:mt-0">
          Total Doctors: <span className="font-semibold">{doctors.length}</span>
        </p>
      </div>

      {/* Doctor Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  doctor.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {doctor.available ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Doctor Info */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800">
                {doctor.name}
              </h3>
              <p className="text-blue-600 text-sm font-medium mb-1">
                {doctor.speciality}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                {doctor.degree} • {doctor.experience} yrs
              </p>
              <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                {[
                  doctor.address?.line1,
                  doctor.address?.line2,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p className="text-gray-800 font-semibold mb-3">
                Fee: ₹{doctor.fees}
              </p>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {doctor.about}
              </p>

              {/* Buttons */}
              <div className="mt-auto flex items-center justify-between gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300">
                  Book
                </button>
                <button
                  onClick={() => handleToggleAvailability(doctor._id)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    doctor.available
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {doctor.available ? "Disable" : "Available"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No doctors */}
      {doctors.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          No doctors found. Please add some.
        </div>
      )}
    </div>
  );
}
export default DoctorsList;