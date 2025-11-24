import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { DoctorContext } from "../context/DoctorContext.jsx"; // ⬅ make sure this exists
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [state, setState] = useState("Admin");
    const { setAToken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext); // ⬅ doctor context

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (state === "Admin") {
                const { data } = await axios.post(`${backendUrl}/api/v1/admin/login`, {
                    email,
                    password,
                });

                if (data.success) {
                    setAToken(data.token);
                    localStorage.setItem("aToken", data.token);
                    toast.success("Logging in...");
                } else {
                    toast.error("Wrong credentials");
                }
            } else {
                // ⭐ DOCTOR LOGIN
                const { data } = await axios.post(`${backendUrl}/api/v1/doctor/login`, {
                    email,
                    password,
                });

                if (data.success) {
                    setDToken(data.token);
                    localStorage.setItem("dToken", data.token);
                    toast.success("Doctor logged in...");
                    console.log(data.token);
                } else {
                    toast.error("Wrong credentials");
                }
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="min-h-[80vh] flex items-center justify-center"
        >
            <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-sm border">
                {/* Heading */}
                <p className="text-2xl font-semibold text-center mb-6">
                    <span className="text-blue-600">{state}</span> Login
                </p>

                {/* Email Input */}
                <div className="mb-4">
                    <p className="text-gray-700 mb-1">Email</p>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <p className="text-gray-700 mb-1">Password</p>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-all duration-300"
                >
                    Login
                </button>

                {/* Toggle Login Type */}
                {state === "Admin" ? (
                    <p className="text-sm text-gray-600 text-center mt-4">
                        Doctor Login?{" "}
                        <span
                            onClick={() => setState("Doctor")}
                            className="text-blue-600 cursor-pointer hover:underline"
                        >
                            Click here
                        </span>
                    </p>
                ) : (
                    <p className="text-sm text-gray-600 text-center mt-4">
                        Admin Login?{" "}
                        <span
                            onClick={() => setState("Admin")}
                            className="text-blue-600 cursor-pointer hover:underline"
                        >
                            Click here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;