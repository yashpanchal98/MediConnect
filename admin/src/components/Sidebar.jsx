import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';

function SideBar() {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* MOBILE MENU BUTTON */}
            {(aToken || dToken) && (
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden fixed top-20 left-4 z-40 p-2.5 rounded-lg bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                </button>
            )}

            {/* MOBILE BACKDROP */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30 mt-16"
                    onClick={closeSidebar}
                />
            )}

            {/* ================================
                ADMIN SIDEBAR — renders IF aToken
               ================================ */}
            {aToken && (
                <aside className={`
                    fixed lg:static inset-y-0 left-0 z-40
                    w-64 sm:w-72 bg-white border-r border-gray-200
                    transform transition-transform duration-300
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <nav className="py-6 px-4 mt-20 lg:mt-0">
                        <h2 className="text-xl font-bold mb-6 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Admin Panel
                        </h2>

                        <ul className="flex flex-col gap-2">
                            <NavLink to="/admin-dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
                                <img src={assets.home_icon} className="w-5" />
                                <p>Dashboard</p>
                            </NavLink>

                            <NavLink to="/all-appointments" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
                                <img src={assets.appointment_icon} className="w-5" />
                                <p>Appointments</p>
                            </NavLink>

                            <NavLink to="/add-doctor" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
                                <img src={assets.add_icon} className="w-5" />
                                <p>Add Doctor</p>
                            </NavLink>

                            <NavLink to="/doctor-list" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
                                <img src={assets.people_icon} className="w-5" />
                                <p>Doctors List</p>
                            </NavLink>
                        </ul>
                    </nav>
                </aside>
            )}

            {/* ================================
                DOCTOR SIDEBAR — renders IF dToken
               ================================ */}
            {dToken && (
                <aside className={`
                    fixed lg:static inset-y-0 left-0 z-40
                    w-64 sm:w-72 bg-white border-r border-gray-200
                    transform transition-transform duration-300
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <nav className="py-6 px-4 mt-20 lg:mt-0">
                        <h2 className="text-xl font-bold mb-6 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Doctor Panel
                        </h2>

                        <ul className="flex flex-col gap-2">
                            <NavLink to="/doctor-dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
                                <img src={assets.home_icon} className="w-5" />
                                <p>Dashboard</p>
                            </NavLink>

                            <NavLink to="/doctor-appointments" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
                                <img src={assets.appointment_icon} className="w-5" />
                                <p>Appointments</p>
                            </NavLink>

                            <NavLink to="/doctor-profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
                                <img src={assets.people_icon} className="w-5" />
                                <p>My Profile</p>
                            </NavLink>

                        </ul>
                    </nav>
                </aside>
            )}
        </>
    );
}

export default SideBar;