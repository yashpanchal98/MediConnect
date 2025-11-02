import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { Upload } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { axiosFormInstance, axiosInstance } from '../../api/axios';

function AddDoctor() {

    const { aToken, BackendUrl } = useContext(AdminContext);

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fee, setFee] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDocImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmitHandler = async (event) => {

        event.preventDefault();

        try {

            if (!docImg) {
                toast.error("Image Not Selected");
            }

            if(password.length < 8){
                toast.error("Password must be of 8 characters...");
            }

            // create a new FormData instance
            const formData = new FormData();

            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', fee);
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({
                line1: address1,
                line2: address2
            }));

            formData.forEach((value, key) => {
                console.log(`${key} : ${value}`)
            })

            try {
                const response = axiosFormInstance.post(`/api/v1/admin/add-doctor`, formData)
                console.log(response.data);
                console.log("Gone");
                if (response.data.success) {
                    toast.success("Doctor Added");

                    // reset form fields
                    setDocImg(false);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setExperience("1 Year");
                    setFee("");
                    setAbout("");
                    setSpeciality("");
                    setDegree("");
                    setAddress1("");
                    setAddress2("");
                } else {
                    toast.error(response.data.message);
                }
            } catch (e) {
                console.error("Error:", err);
            }

        } catch (error) {

        }


    }

    return (
        <form className="max-w-6xl mx-auto p-6 sm:p-8 lg:p-10">
            {/* Heading with gradient */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    Add Doctor
                </h1>
                <p className="text-gray-500 text-sm">Fill in the details to add a new doctor to the system</p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Section */}
                <div className="space-y-6">
                    {/* Upload Image */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-dashed border-blue-200 hover:border-blue-400 transition-all duration-300">
                        <label htmlFor="doc-img" className="flex flex-col items-center cursor-pointer group">
                            {docImg ? (
                                <div className="relative">
                                    <img
                                        src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                                        alt="Preview"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Upload className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                                        <Upload className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <p className="text-center text-gray-600 font-medium">
                                        Upload doctor picture
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                </>
                            )}
                        </label>
                        <input
                            type="file"
                            id="doc-img"
                            hidden
                            accept="image/*"
                            onChange={(e) => setDocImg(e.target.files[0])}
                        />
                    </div>

                    {/* Doctor Info */}
                    <div className="space-y-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Doctor Name *
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Dr. John Doe"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Doctor Email *
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="doctor@hospital.com"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Password *
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    Experience *
                                </label>
                                <select
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white">
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <option key={i} value={`${i + 1} Year`}>
                                            {i + 1} Year{i > 0 ? 's' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    Fees *
                                </label>
                                <input
                                    value={fee}
                                    onChange={(e) => setFee(e.target.value)}
                                    type="number"
                                    placeholder="500"
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="space-y-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Speciality *
                        </label>
                        <select
                            value={speciality}
                            onChange={(e) => setSpeciality(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white">
                            <option>General physician</option>
                            <option>Gynecologist</option>
                            <option>Dermatologist</option>
                            <option>Pediatricians</option>
                            <option>Neurologist</option>
                            <option>Gastroenterologist</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Education *
                        </label>
                        <input
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            type="text"
                            placeholder="MBBS, MD"
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Address *
                        </label>
                        <input
                            type="text"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            placeholder="Street Address"
                            required
                            className="w-full px-4 py-3 mb-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <input
                            type="text"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                            placeholder="City, State, ZIP"
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            About Doctor *
                        </label>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            placeholder="Write a brief description about the doctor's expertise and experience..."
                            rows={6}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={onSubmitHandler}
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
                >
                    Add Doctor
                </button>
            </div>
        </form>
    );
}

export default AddDoctor;