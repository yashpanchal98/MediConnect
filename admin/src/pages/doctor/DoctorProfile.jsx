import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { axiosInstance } from "../../api/axios";
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
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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
      formData.append("address", JSON.stringify(doctorData.address));
      formData.append("available", doctorData.available);

      if (doctorData.image instanceof File) {
        formData.append("image", doctorData.image);
      }

      const decoded = JSON.parse(atob(token.split(".")[1]));
      const doctorId = decoded.id;

      const res = await axiosInstance.post(
        `/api/v1/doctor/update-profile/${doctorId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
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

  return (
    <div className="max-w-4xl mx-auto p-6 mb-20 bg-white shadow-md rounded-lg mt-10">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <div className="relative">
          <img
            src={
              doctorData.image instanceof File
                ? URL.createObjectURL(doctorData.image)
                : doctorData.image
            }
            alt="Doctor"
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
          />

          {isEdit && (
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-600">
              Change
              <input type="file" hidden onChange={handleImage} />
            </label>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          {isEdit ? (
            <input
              type="text"
              value={doctorData.name}
              onChange={(e) =>
                setDoctorData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border-b-2 border-gray-300 text-2xl font-semibold px-2 py-1 focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p className="text-2xl font-semibold text-gray-800">
              {doctorData.name}
            </p>
          )}

          <p className="text-gray-500">{doctorData.email}</p>
        </div>

        <button
          onClick={() => (isEdit ? handleSave() : setIsEdit(true))}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>

      <hr className="my-6" />

      {/* Professional Info */}
      <div className="space-y-4">
        <p className="text-lg font-semibold text-gray-800 border-b pb-2">
          PROFESSIONAL INFORMATION
        </p>

        {/* Speciality */}
        <div className="flex items-center gap-4">
          <p className="font-medium w-32">Speciality:</p>
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
              className="border rounded px-3 py-2"
            />
          ) : (
            <p>{doctorData.speciality}</p>
          )}
        </div>

        {/* Degree */}
        <div className="flex items-center gap-4">
          <p className="font-medium w-32">Degree:</p>
          {isEdit ? (
            <input
              type="text"
              value={doctorData.degree}
              onChange={(e) =>
                setDoctorData((prev) => ({ ...prev, degree: e.target.value }))
              }
              className="border rounded px-3 py-2"
            />
          ) : (
            <p>{doctorData.degree}</p>
          )}
        </div>

        {/* Experience */}
        <div className="flex items-center gap-4">
          <p className="font-medium w-32">Experience:</p>
          {isEdit ? (
            <input
              type="text"
              value={doctorData.experience}
              onChange={(e) =>
                setDoctorData((prev) => ({
                  ...prev,
                  experience: e.target.value,
                }))
              }
              className="border rounded px-3 py-2"
            />
          ) : (
            <p>{doctorData.experience} years</p>
          )}
        </div>

        {/* Fees */}
        <div className="flex items-center gap-4">
          <p className="font-medium w-32">Fees:</p>
          {isEdit ? (
            <input
              type="number"
              value={doctorData.fees}
              onChange={(e) =>
                setDoctorData((prev) => ({ ...prev, fees: e.target.value }))
              }
              className="border rounded px-3 py-2"
            />
          ) : (
            <p>₹ {doctorData.fees}</p>
          )}
        </div>

        {/* Available */}
        <div className="flex items-center gap-4">
          <p className="font-medium w-32">Available:</p>
          {isEdit ? (
            <select
              value={doctorData.available}
              onChange={(e) =>
                setDoctorData((prev) => ({ ...prev, available: e.target.value }))
              }
              className="border rounded px-3 py-2"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          ) : (
            <p>{doctorData.available ? "Yes" : "No"}</p>
          )}
        </div>
      </div>

      <hr className="my-6" />

      {/* Contact + Address */}
      <div className="space-y-4">
        <p className="text-lg font-semibold text-gray-800 border-b pb-2">
          CONTACT INFORMATION
        </p>

        {/* Phone */}
        <div className="flex items-center gap-4">
          <p className="font-medium w-32">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={doctorData.phone}
              onChange={(e) =>
                setDoctorData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="border rounded px-3 py-2"
            />
          ) : (
            <p>{doctorData.phone}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <p className="font-medium mb-1">Address:</p>
          {isEdit ? (
            <div className="space-y-2">
              <input
                type="text"
                value={doctorData.address?.line1 || ""}
                onChange={(e) =>
                  setDoctorData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="border rounded px-3 py-2 w-full"
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
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          ) : (
            <p>
              {doctorData.address?.line1}
              <br />
              {doctorData.address?.line2}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;