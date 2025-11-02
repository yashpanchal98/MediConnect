import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // ✅ Fetch user profile when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/api/v1/user/get-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUserData(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  // ✅ Handle save (update profile)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      // Create FormData (for optional image upload)
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("address", JSON.stringify(userData.address));
      if (userData.image instanceof File) {
        formData.append("image", userData.image);
      }

      const response = await axiosInstance.post(
        "/api/v1/user/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        setIsEdit(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    }
  };

  // ✅ Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserData((prev) => ({ ...prev, image: file }));
  };

  if (!userData) {
    return <p className="text-center text-gray-600 mt-20">Loading profile...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mb-20 bg-white shadow-md rounded-lg mt-10">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <div className="relative">
          <img
            src={
              userData.image instanceof File
                ? URL.createObjectURL(userData.image)
                : userData.image
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
          />
          {isEdit && (
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-600">
              Change
              <input type="file" hidden onChange={handleImageChange} />
            </label>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border-b-2 border-gray-300 text-2xl font-semibold px-2 py-1 focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p className="text-2xl font-semibold text-gray-800">
              {userData.name}
            </p>
          )}
          <p className="text-gray-500">{userData.email}</p>
        </div>

        <button
          onClick={() => (isEdit ? handleSave() : setIsEdit(true))}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>

      <hr className="my-6" />

      {/* Contact Information */}
      <div className="space-y-4">
        <p className="text-lg font-semibold text-gray-800 border-b pb-2">
          CONTACT INFORMATION
        </p>

        {/* Phone */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <p className="font-medium text-gray-700 w-32">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="text-gray-600">{userData.phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
          <p className="font-medium text-gray-700 w-32">Address:</p>
          {isEdit ? (
            <div className="space-y-2">
              <input
                type="text"
                value={userData.address?.line1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={userData.address?.line2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ) : (
            <p className="text-gray-600">
              {userData.address?.line1} <br />
              {userData.address?.line2}
            </p>
          )}
        </div>
      </div>

      <hr className="my-6" />

      {/* Basic Information */}
      <div className="space-y-4">
        <p className="text-lg font-semibold text-gray-800 border-b pb-2">
          BASIC INFORMATION
        </p>

        {/* Gender */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <p className="font-medium text-gray-700 w-32">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-600">{userData.gender}</p>
          )}
        </div>

        {/* DOB */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <p className="font-medium text-gray-700 w-32">Date of Birth:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="text-gray-600">{userData.dob}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;