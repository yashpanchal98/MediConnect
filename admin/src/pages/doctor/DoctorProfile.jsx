import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { axiosFormInstance, axiosInstance } from "../../api/axios";
import { toast } from "react-toastify";

function DoctorProfile() {
  const { dToken } = useContext(DoctorContext);

  const [doctorData, setDoctorData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // Fetch doctor profile
  useEffect(() => {
    
    const fetchProfile = async () => {
      try {
        const token = dToken || localStorage.getItem("dToken");
        if (!token) return;

        const decoded = JSON.parse(atob(token.split(".")[1]));
        const doctorId = decoded.id;

        const res = await axiosInstance.get(
          `/api/v1/doctor/get-profile/${doctorId}`,
        );

        if (res.data.success) {
          setDoctorData(res.data.doctor);
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error("Failed to load profile");
        console.log(err);
      }
    };

    fetchProfile();
  }, [dToken]);

  // Save doctor updates
  const handleSave = async () => {
    try {
      const token = dToken || localStorage.getItem("dToken");

      const formData = new FormData();
      formData.append("name", doctorData.name);
      formData.append("phone", doctorData.phone);
      formData.append("speciality", doctorData.speciality);
      formData.append("degree", doctorData.degree);
      formData.append("experience", doctorData.experience);
      formData.append("fees", doctorData.fees);
      // Ensure address is stringified for FormData
      formData.append("address", JSON.stringify(doctorData.address));
      
      // ⭐ FIX: Explicitly convert the boolean state to a string ("true" or "false")
      // so the server receives a predictable value from FormData.
      formData.append("available", doctorData.available.toString());

      if (doctorData.image instanceof File) {
        formData.append("image", doctorData.image);
      }

      const decoded = JSON.parse(atob(token.split(".")[1]));
      const doctorId = decoded.id;

      const res = await axiosFormInstance.post(
        `/api/v1/doctor/update-profile/${doctorId}`,
        formData,
      );

      if (res.data.success) {
        toast.success("Profile updated!");
        setIsEdit(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  // Image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    setDoctorData((prev) => ({ ...prev, image: file }));
  };

  if (!doctorData) {
    return <p className="text-center text-gray-600 mt-20">Loading profile...</p>;
  }

  // Helper component for cleaner layout of profile fields
  const ProfileField = ({ label, children }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100 last:border-b-0">
      <p className="font-medium text-gray-600 w-full sm:w-40 mb-1 sm:mb-0 shrink-0">
        {label}:
      </p>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 mb-20 bg-white shadow-xl rounded-xl mt-10 ring-1 ring-gray-200">
      
      {/* Profile Header and Action Button */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-200 mb-6">
        <div className="relative shrink-0">
          <img
            src={
              doctorData.image instanceof File
                ? URL.createObjectURL(doctorData.image)
                : doctorData.image
            }
            alt="Doctor Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />

          {isEdit && (
            <label
              title="Change Profile Picture"
              className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs p-2 rounded-full cursor-pointer hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.455 4h3.09a2 2 0 011.664.89l.812 1.22a2 2 0 001.664.89H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input type="file" hidden accept="image/*" onChange={handleImage} />
            </label>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left min-w-0">
          {isEdit ? (
            <input
              type="text"
              value={doctorData.name}
              onChange={(e) =>
                setDoctorData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Doctor's Name"
              className="border-b-2 border-gray-300 text-3xl font-bold text-gray-800 w-full px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-200"
            />
          ) : (
            <p className="text-3xl font-bold text-gray-800 truncate">
              {doctorData.name}
            </p>
          )}
          <p className="text-lg text-gray-500 font-light mt-1 truncate">{doctorData.email}</p>
        </div>

        <button
          onClick={() => (isEdit ? handleSave() : setIsEdit(true))}
          className={`shrink-0 w-full sm:w-auto px-6 py-2 rounded-lg font-semibold transition duration-300 shadow-lg ${isEdit
              ? "bg-green-500 text-white hover:bg-green-600 focus:ring-4 focus:ring-green-300"
              : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            }`}
        >
          {isEdit ? "💾 Save Profile" : "✏️ Edit Profile"}
        </button>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Professional Info Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <p className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300 flex items-center">
            <span className="mr-2 text-blue-500">🎓</span> PROFESSIONAL INFORMATION
          </p>

          <div className="space-y-2">
            
            {/* Speciality */}
            <ProfileField label="Speciality">
              {isEdit ? (
                <input
                  type="text"
                  value={doctorData.speciality}
                  onChange={(e) =>
                    setDoctorData((prev) => ({
                      ...prev,
                      speciality: e.target.value,
                    }))
                  }
                  placeholder="e.g., Cardiologist"
                  className="border border-gray-300 rounded-md w-full px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              ) : (
                <p className="text-gray-800 font-medium">{doctorData.speciality}</p>
              )}
            </ProfileField>

            {/* Degree */}
            <ProfileField label="Degree">
              {isEdit ? (
                <input
                  type="text"
                  value={doctorData.degree}
                  onChange={(e) =>
                    setDoctorData((prev) => ({ ...prev, degree: e.target.value }))
                  }
                  placeholder="e.g., MBBS, MD"
                  className="border border-gray-300 rounded-md w-full px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              ) : (
                <p className="text-gray-800 font-medium">{doctorData.degree}</p>
              )}
            </ProfileField>

            {/* Experience */}
            <ProfileField label="Experience">
              {isEdit ? (
                <input
                  type="number"
                  value={doctorData.experience}
                  onChange={(e) =>
                    setDoctorData((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                  placeholder="Years"
                  className="border border-gray-300 rounded-md w-24 px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              ) : (
                <p className="text-gray-800 font-medium">
                  {doctorData.experience} years
                </p>
              )}
            </ProfileField>

            {/* Fees */}
            <ProfileField label="Consultation Fees">
              {isEdit ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">₹</span>
                  <input
                    type="number"
                    value={doctorData.fees}
                    onChange={(e) =>
                      setDoctorData((prev) => ({ ...prev, fees: e.target.value }))
                    }
                    placeholder="Amount"
                    className="border border-gray-300 rounded-md w-32 pl-8 pr-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              ) : (
                <p className="text-gray-800 font-medium">₹ {doctorData.fees}</p>
              )}
            </ProfileField>

            {/* Available */}
            <ProfileField label="Currently Available">
              {isEdit ? (
                <select
                  value={doctorData.available}
                  onChange={(e) => {
                    // FIX APPLIED: Convert string value from select to boolean
                    const isAvailable = e.target.value === "true";
                    setDoctorData((prev) => ({
                      ...prev,
                      available: isAvailable
                    }));
                  }}
                  className="border border-gray-300 rounded-md px-3 py-2 w-24 focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : (
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${doctorData.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {doctorData.available ? "✅ Yes" : "❌ No"}
                </span>
              )}
            </ProfileField>
          </div>
        </div>

        {/* Contact & Address Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <p className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300 flex items-center">
            <span className="mr-2 text-blue-500">📞</span> CONTACT & LOCATION
          </p>

          <div className="space-y-2">
            {/* Phone */}
            <ProfileField label="Phone Number">
              {isEdit ? (
                <input
                  type="text"
                  value={doctorData.phone}
                  onChange={(e) =>
                    setDoctorData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="e.g., +91 9876543210"
                  className="border border-gray-300 rounded-md w-full px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              ) : (
                <p className="text-gray-800 font-medium">{doctorData.phone}</p>
              )}
            </ProfileField>

            {/* Address */}
            <div className="pt-2">
              <p className="font-medium text-gray-600 mb-2">Clinic/Hospital Address:</p>
              {isEdit ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={doctorData.address?.line1 || ""}
                    onChange={(e) =>
                      setDoctorData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    placeholder="Street Address, Area"
                    className="border border-gray-300 rounded-md w-full px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <input
                    type="text"
                    value={doctorData.address?.line2 || ""}
                    onChange={(e) =>
                      setDoctorData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    placeholder="City, State, Pincode"
                    className="border border-gray-300 rounded-md w-full px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              ) : (
                <p className="text-gray-800 font-medium leading-relaxed bg-white p-3 rounded-md border border-gray-200">
                  {doctorData.address?.line1}
                  <br />
                  {doctorData.address?.line2}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;