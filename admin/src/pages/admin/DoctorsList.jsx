import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../api/axios';

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axiosInstance.get('/api/v1/admin/all-doctors');
        setDoctors(data.doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // ✅ Function to toggle availability
  const handleToggleAvailability = async (doctorId) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/admin/change-availability/${doctorId}`
      );

      // Assuming backend returns updated doctor
      const updatedDoctor = data.doctor;

      // Update the state locally
      setDoctors((prevDoctors) =>
        prevDoctors.map((doc) =>
          doc._id === updatedDoctor._id ? updatedDoctor : doc
        )
      );
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  return (
    <div className="px-4 sm:px-10 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center sm:text-left">
        Doctors List
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-56 object-cover"
              />
              {doctor.available && (
                <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Available
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
              <p className="text-gray-500">{doctor.speciality}</p>
              <p className="text-gray-600 text-sm">
                {doctor.degree} - {doctor.experience} yrs
              </p>
              <p className="text-gray-500 text-sm">{doctor.address}</p>
              <p className="text-gray-800 font-semibold mt-2">Fee: ${doctor.fees}</p>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">{doctor.about}</p>

              <div className="mt-4 flex justify-between items-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300">
                  Book Appointment
                </button>

                {/* ✅ Toggle Availability Button */}
                <button
                  onClick={() => handleToggleAvailability(doctor._id)}
                  className={`py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                    doctor.available
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {doctor.available ? 'Set Unavailable' : 'Set Available'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsList;