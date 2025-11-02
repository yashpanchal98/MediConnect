import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { UserContext } from "../context/userContext";

function Navbar() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const { user, setUser } = useContext(UserContext);

    // ✅ Load token from localStorage when component mounts
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);

        const handleStorageChange = () => {
            const updatedToken = localStorage.getItem("token");
            setToken(updatedToken);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // ✅ Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        navigate("/login");
    };

    // ✅ Handle Create Account button click
    const handleLoginClick = () => {
        navigate("/login");
    };

    const profileImage =
        user?.image || assets.profile_pic; // fallback if user image missing

    return (
        <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
            {/* Logo */}
            <Link to="/">
                <img
                    className="w-36 md:w-44 cursor-pointer transition-transform duration-200 hover:scale-105"
                    src={assets.logo}
                    alt="Logo"
                />
            </Link>

            {/* Nav Links */}
            <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
                {["/", "/doctors", "/about", "/contact"].map((path, idx) => {
                    const labels = ["Home", "All Doctors", "About", "Contact"];
                    return (
                        <li key={idx}>
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    `underline-offset-4 transition-all duration-200 ${isActive
                                        ? "text-blue-600 underline"
                                        : "text-gray-700 hover:text-blue-600 hover:underline"
                                    }`
                                }
                            >
                                {labels[idx]}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>

            {/* ✅ Login / Profile Dropdown */}
            <div className="flex items-center gap-4">
                {token ? (
                    <div className="flex items-center gap-3 cursor-pointer group relative">
                        {/* ✅ Greeting */}
                        <p className="hidden md:block text-gray-700 font-medium">
                            Hi, {user?.name?.split(" ")[1] || "User"} 👋
                        </p>

                        {/* ✅ Profile picture */}
                        <img
                            className="w-8 h-8 rounded-full object-cover border border-gray-300"
                            src={user?.image || assets.profile_pic}
                            alt="Profile"
                        />

                        <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
                        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                            <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                                <p
                                    onClick={() => navigate("/my-profile")}
                                    className="hover:text-black cursor-pointer"
                                >
                                    My Profile
                                </p>
                                <p
                                    onClick={() => navigate("/my-appointments")}
                                    className="hover:text-black cursor-pointer"
                                >
                                    My Appointments
                                </p>
                                <p
                                    onClick={handleLogout}
                                    className="hover:text-black cursor-pointer text-red-600"
                                >
                                    Logout
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={handleLoginClick}
                        className="bg-indigo-500 text-white px-4 py-3 text-sm rounded-full font-light hover:bg-indigo-600 transition"
                    >
                        Create Account
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;