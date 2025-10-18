import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';

function SideBar() {
    const {aToken} = useContext(AdminContext);
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        {
            path: '/admin-dashboard',
            icon: assets.home_icon,
            label: 'Dashboard'
        },
        {
            path: '/all-appointments',
            icon: assets.appointment_icon,
            label: 'Appointments'
        },
        {
            path: '/add-doctor',
            icon: assets.add_icon,
            label: 'Add Doctor'
        },
        {
            path: '/doctor-list',
            icon: assets.people_icon,
            label: 'Doctors List'
        }
    ];

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button - Positioned to avoid navbar */}
            {aToken && (
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden fixed top-20 left-4 z-40 p-2.5 rounded-lg bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <X className="w-6 h-6 text-gray-700" />
                    ) : (
                        <Menu className="w-6 h-6 text-gray-700" />
                    )}
                </button>
            )}

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity mt-16"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-64 sm:w-72 lg:w-64 xl:w-72
                min-h-screen bg-white border-r border-gray-200
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {aToken && (
                    <nav className="py-6 px-4 lg:px-6 mt-20 lg:mt-0">
                        {/* Optional Logo/Brand Section */}
                        <div className="mb-8 px-4 hidden lg:block">
                            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Admin Panel
                            </h2>
                        </div>

                        <ul className="flex flex-col gap-2">
                            {navItems.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={item.path}
                                    onClick={closeSidebar}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group hover:shadow-md ${
                                            isActive
                                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                                                : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 flex-shrink-0 ${
                                                isActive 
                                                    ? 'bg-white/20' 
                                                    : 'bg-gray-100 group-hover:bg-white group-hover:shadow-sm'
                                            }`}>
                                                <img 
                                                    src={item.icon} 
                                                    alt={item.label}
                                                    className="w-5 h-5 object-contain"
                                                />
                                            </div>
                                            <p className={`font-medium text-sm sm:text-base transition-all duration-300 ${
                                                isActive 
                                                    ? 'font-semibold' 
                                                    : 'group-hover:translate-x-1'
                                            }`}>
                                                {item.label}
                                            </p>
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </ul>

                        {/* Optional Footer Section */}
                        <div className="mt-auto pt-8 px-4 border-t border-gray-200 hidden lg:block">
                            <p className="text-xs text-gray-500 text-center">
                                © 2025 Admin Dashboard
                            </p>
                        </div>
                    </nav>
                )}
            </div>
        </>
    )
}

export default SideBar;