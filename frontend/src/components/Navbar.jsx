import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";

function Navbar() {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true)

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
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `underline-offset-4 transition-all duration-200 ${isActive
                                ? "text-blue-600 underline"
                                : "text-gray-700 hover:text-blue-600 hover:underline"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/doctors"
                        className={({ isActive }) =>
                            `underline-offset-4 transition-all duration-200 ${isActive
                                ? "text-blue-600 underline"
                                : "text-gray-700 hover:text-blue-600 hover:underline"
                            }`
                        }
                    >
                        All Doctors
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `underline-offset-4 transition-all duration-200 ${isActive
                                ? "text-blue-600 underline"
                                : "text-gray-700 hover:text-blue-600 hover:underline"
                            }`
                        }
                    >
                        About
                    </NavLink>
                </li>
                <li>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `underline-offset-4 transition-all duration-200 ${isActive
                                ? "text-blue-600 underline"
                                : "text-gray-700 hover:text-blue-600 hover:underline"
                            }`
                        }
                    >
                        Contact
                    </NavLink>
                </li>
            </ul>

            {/* Button */}

            <div className="flex items-center gap-4">
                {
                    token
                        ? <div className="flex items-center gap-2 cursor-pointer group relative" >
                            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt=" " />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('my-profile')} className="hover:text-black cursor-pointer" >My Profile</p>
                                    <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer' >My Appointments</p>
                                    <p onClick={() => setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button className='bg-indigo-500 text-white px-4 py-3 text-sm rounded-full font-light md:blodk' onClick={() => {
                            navigate('/login');
                            setToken(true);
                        }}>Create Account</button>
                }
            </div>

        </nav>
    );
}

export default Navbar;