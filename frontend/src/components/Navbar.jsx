import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { UserContext } from "../context/userContext";

function Navbar() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
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
        setMenuOpen(false);
    };

    // ✅ Handle Create Account button click
    const handleLoginClick = () => {
        navigate("/login");
    };

    const profileImage =
        user?.image || assets.profile_pic; // fallback if user image missing

    return (
        <nav className="flex items-center justify-between px-4 sm:px-6 py-4 shadow-md bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 sticky top-0 z-50">
            {/* Logo */}
            <Link to="/">
                <img
                    className="w-32 sm:w-36 md:w-44 cursor-pointer transition-transform duration-200 hover:scale-105"
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
            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden inline-flex items-center justify-center p-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
            >
                <span className="sr-only">Toggle navigation</span>
                <div className="space-y-1">
                    {[0, 1, 2].map((line) => (
                        <span
                            key={line}
                            className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${
                                menuOpen ? (line === 1 ? "opacity-0" : line === 0 ? "translate-y-1.5 rotate-45" : "-translate-y-1.5 -rotate-45") : ""
                            }`}
                        />
                    ))}
                </div>
            </button>

            {/* Mobile Drawer */}
            <div
                className={`md:hidden fixed inset-x-4 top-20 rounded-2xl border border-gray-100 bg-white/95 shadow-xl transition-all duration-300 ${
                    menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"
                }`}
            >
                <ul className="flex flex-col gap-2 p-5 font-medium text-gray-700">
                    {["/", "/doctors", "/about", "/contact"].map((path, idx) => {
                        const labels = ["Home", "All Doctors", "About", "Contact"];
                        return (
                            <li key={idx}>
                                <NavLink
                                    to={path}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block rounded-xl px-4 py-2 transition ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`
                                    }
                                >
                                    {labels[idx]}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>

                <div className="border-t border-gray-100 px-5 py-4">
                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="w-full rounded-xl border border-red-200 bg-red-50/70 px-4 py-2 text-red-600 font-medium hover:bg-red-100 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={handleLoginClick}
                            className="w-full rounded-xl bg-indigo-500 px-4 py-2 text-white font-medium hover:bg-indigo-600 transition"
                        >
                            Create Account
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;