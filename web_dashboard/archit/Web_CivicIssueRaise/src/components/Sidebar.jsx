// src/components/Sidebar.jsx
import React from 'react';
import {
  HomeIcon,
  TicketIcon,
  ChartBarIcon,
  MapIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  // Navigation items with a unique notification badge on "Issues"
  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, current: true },
    { name: 'Issues Management', icon: TicketIcon, current: false, count: 5 },
    { name: 'Live Map', icon: MapIcon, current: false },
    { name: 'Analytics', icon: ChartBarIcon, current: false },
  ];

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-900 text-gray-300 sticky top-0">
      
      {/* 1. Header & Logo */}
      <h2 className="text-3xl font-semibold text-white">City<span className="text-indigo-400">Fix</span></h2>
      
      {/* 2. Global Search (Unique Feature) */}
      <div className="relative mt-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        </span>
        <input
          type="text"
          className="w-full py-2 pl-10 pr-4 text-gray-200 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-300"
          placeholder="Global Search"
        />
      </div>

      {/* 3. Quick Report Button (Unique Feature) */}
      <div className="mt-6">
        <button className="w-full flex items-center justify-center px-4 py-2 text-md font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          <PlusCircleIcon className="w-6 h-6 mr-2" />
          Quick Report
        </button>
      </div>

      {/* 4. Navigation Links */}
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-4 py-2 mt-2 transition-colors duration-300 transform rounded-md 
                ${item.current ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="mx-4 font-medium">{item.name}</span>
              {item.count && (
                <span className="ml-auto text-xs font-semibold text-white bg-red-500 rounded-full px-2 py-0.5">
                  {item.count}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* 5. User Profile Section (Unique Feature) */}
        <div className="flex items-center px-4 -mx-2 pt-4 border-t border-gray-700">
          <img className="object-cover w-10 h-10 mx-2 rounded-full" src="https://g.co/gemini/share/image/M5Jb89C5cc94f58c" alt="avatar" />
          <div className="mx-2">
            <h4 className="font-semibold text-white">Archit Shelar</h4>
            <p className="text-sm text-gray-400 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;