import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doctors } from '../assets/assets';
import { assets } from '../assets/assets';
import { useState } from 'react';

function Appointment() {

  const { docId } = useParams();
  const daysOfWeek = ['SUN', "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  console.log(docId);

  const [docInfo, setDocInfo] = useState();
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  }

  const getAvailableSlots = async () => {
    const slots = []; // temp array to collect all slots
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      // current date
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // end time for the day: 21:00
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      // set start time
      if (i === 0) {
        // today
        const hour = currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10;
        const minute = currentDate.getMinutes() > 30 ? 30 : 0;
        currentDate.setHours(hour, minute, 0, 0);
      } else {
        // future days
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      const slotTime = new Date(currentDate);

      while (slotTime < endTime) {
        const formattedTime = slotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlots.push({
          datetime: new Date(slotTime),
          time: formattedTime,
        });

        slotTime.setMinutes(slotTime.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  };

  useEffect(() => {
    fetchInfo()
  }, [docId]);

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])




  return docInfo && (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Doctor Details Card */}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden gap-6 md:gap-10 p-6 md:p-10">

        {/* Left Side: Doctor Image */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full h-64 md:h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right Side: Doctor Info */}
        <div className="flex-1 flex flex-col justify-between">

          {/* Name and Verification */}
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{docInfo.name}</h2>
            <img src={assets.verified_icon} alt="Verified" className="w-6 h-6" />
          </div>

          {/* Degree, Speciality, Experience */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <p className="text-gray-600">{docInfo.degree} - {docInfo.speciality}</p>
            <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition">
              {docInfo.experience} yrs Experience
            </button>
          </div>

          {/* About Section */}
          <div className="mb-4">
            <p className="flex items-center font-semibold text-gray-700 mb-2">
              About <img src={assets.info_icon} alt="Info" className="w-4 h-4 ml-2" />
            </p>
            <p className="text-gray-600">{docInfo.about}</p>
          </div>

          {/* Appointment Fee */}
          <p className="text-gray-800 font-semibold text-lg">
            Appointment Fee: <span className="text-blue-600">{docInfo.fees}</span>
          </p>

        </div>
      </div>


      {/* Booking slots */}
      <div className="sm:ml-0 md:ml-72 sm:pl-0 md:pl-4 mt-6 font-medium text-gray-700 max-w-5xl mx-auto">
        <p className="text-lg font-semibold mb-3">Booking Slots</p>

        {/* Days Horizontal Scroll */}
        <div className="flex gap-3 items-center w-full overflow-x-auto py-2">
          {docSlots.length > 0 &&
            docSlots.map((daySlots, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`flex flex-col items-center px-4 py-2 min-w-[70px] rounded-lg cursor-pointer border transition-colors duration-200 ${slotIndex === index
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <p className="text-sm font-semibold">
                  {daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}
                </p>
                <p className="text-xs">{daySlots[0] && daySlots[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        {/* Time Slots */}
        <div className="flex flex-wrap gap-3 mt-4">
          {docSlots.length > 0 &&
            docSlots[slotIndex].map((slot, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(slot.time)}
                className={`px-4 py-2 rounded-lg text-sm cursor-pointer transition ${slotTime === slot.time
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
                  }`}
              >
                {slot.time.toLowerCase()}
              </p>
            ))}
        </div>
        <button
          className="mt-6 w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md"
        >
          Book Appointment
        </button>
      </div>
    </div >
  )
}

export default Appointment