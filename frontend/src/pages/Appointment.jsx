import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/axios";
import { assets } from "../assets/assets";

function Appointment() {

  const { docId } = useParams();
  const navigate = useNavigate();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check login status
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  // ✅ Fetch doctor info
  const fetchDoctorInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/api/v1/doctor/${docId}`);
      if (data.success) {
        setDocInfo(data.doctor);
      } else {
        toast.error("Doctor not found");
      }
    } catch (error) {
      console.error("Fetch doctor error:", error);
      toast.error("Failed to fetch doctor details");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Generate available slots with booked ones disabled
  const getAvailableSlots = () => {
    if (!docInfo) return;

    const slots = [];
    const today = new Date();
    const bookedSlots = docInfo?.slots_booked || {};

    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      const dateKey = day.toISOString().split("T")[0];

      const startTime = new Date(day);
      const endTime = new Date(day);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        const hour = startTime.getHours() > 10 ? startTime.getHours() + 1 : 10;
        const minute = startTime.getMinutes() > 30 ? 30 : 0;
        startTime.setHours(hour, minute, 0, 0);
      } else {
        startTime.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      const slotCursor = new Date(startTime);

      while (slotCursor < endTime) {
        const formattedTime = slotCursor.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        const isBooked =
          bookedSlots[dateKey]?.includes(formattedTime) || false;

        timeSlots.push({
          datetime: new Date(slotCursor),
          time: formattedTime,
          isBooked,
        });

        slotCursor.setMinutes(slotCursor.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  };

  // ✅ Fetch data & generate slots
  useEffect(() => {
    fetchDoctorInfo();
  }, [docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  // ✅ Ensure slotIndex is always valid
  useEffect(() => {
    if (docSlots.length > 0) setSlotIndex(0);
  }, [docSlots]);

  // ✅ Book appointment
  const handleBookAppointment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must log in to book an appointment");
      navigate("/login");
      return;
    }

    if (!slotTime) {
      toast.error("Please select a slot");
      return;
    }

    try {
      const slotDate = docSlots[slotIndex][0].datetime.toLocaleDateString(
        "en-CA"
      );

      const { data } = await axiosInstance.post(
        "/api/v1/user/book-appointment",
        { docId, slotDate, slotTime },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Appointment booked successfully!");

        setDocInfo((prev) => {
          const updated = { ...prev };
          if (!updated.slots_booked[slotDate]) {
            updated.slots_booked[slotDate] = [];
          }
          updated.slots_booked[slotDate].push(slotTime);
          return updated;
        });

        setSlotTime("");
        getAvailableSlots();
      } else {
        toast.error(data.message || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Loading / empty states
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600">
        <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 mr-3"></div>
        <p className="text-lg font-semibold">Loading Doctor Details...</p>
      </div>
    );

  if (!docInfo)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        <p className="text-lg font-semibold">Doctor not found.</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Doctor Info */}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden gap-6 md:gap-10 p-6 md:p-10">
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full h-64 md:h-full object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {docInfo.name}
            </h2>
            <img src={assets.verified_icon} alt="Verified" className="w-6 h-6" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <p className="text-gray-600">
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition">
              {docInfo.experience} yrs Experience
            </button>
          </div>

          <div className="mb-4">
            <p className="flex items-center font-semibold text-gray-700 mb-2">
              About{" "}
              <img
                src={assets.info_icon}
                alt="Info"
                className="w-4 h-4 ml-2"
              />
            </p>
            <p className="text-gray-600">{docInfo.about}</p>
          </div>

          <p className="text-gray-800 font-semibold text-lg">
            Appointment Fee:{" "}
            <span className="text-blue-600">₹{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-6 font-medium text-gray-700 max-w-5xl mx-auto">
        <p className="text-lg font-semibold mb-3">Booking Slots</p>

        {/* ✅ Days */}
        <div className="flex gap-3 overflow-x-auto py-2">
          {docSlots.length > 0 &&
            docSlots.map((daySlots, index) => {
              if (!daySlots || !daySlots[0]) return null; // ✅ prevent crash

              return (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`flex flex-col items-center px-4 py-2 min-w-[70px] rounded-lg cursor-pointer border transition-colors ${
                    slotIndex === index
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <p className="text-sm font-semibold">
                    {daysOfWeek[daySlots[0].datetime.getDay()]}
                  </p>
                  <p className="text-xs">{daySlots[0].datetime.getDate()}</p>
                </div>
              );
            })}
        </div>

        {/* ✅ Time Slots */}
        <div className="flex flex-wrap gap-3 mt-4">
          {docSlots.length > 0 &&
            docSlots[slotIndex] &&
            docSlots[slotIndex].map((slot, index) => (
              <button
                key={index}
                disabled={slot.isBooked}
                onClick={() => !slot.isBooked && setSlotTime(slot.time)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  slot.isBooked
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : slotTime === slot.time
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {slot.time.toLowerCase()}
              </button>
            ))}
        </div>

        {/* ✅ Book Button */}
        <button
          onClick={handleBookAppointment}
          disabled={!isLoggedIn || !slotTime}
          className={`mt-6 w-full md:w-auto px-6 py-3 font-semibold rounded-lg shadow-md transition ${
            !isLoggedIn || !slotTime
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isLoggedIn ? "Book Appointment" : "Login to Book"}
        </button>
      </div>
    </div>
  );
}

export default Appointment;