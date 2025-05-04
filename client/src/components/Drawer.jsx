import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart2,
  List,
  Users,
  Calendar,
  PieChart,
  Crown,
  Settings,
  X,
} from "lucide-react";

function Drawer({sidebarOpen, setSidebarOpen}) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.replace("/", "");

  const handleTabChange = (view) => {
    navigate(`/${view}`);
  };

  const getLinkClasses = (view) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${
      currentPath === view
        ? "text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-gray-200 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">TaskFlow</h1>
        <button
          className="text-gray-500 flex w-full justify-end items-end hover:text-gray-700 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        <nav className="flex-1 space-y-1">
          <button
            onClick={() => handleTabChange("")}
            className={getLinkClasses("")}
          >
            <BarChart2 className="mr-3" size={18} />
            Dashboard
          </button>
          <button
            onClick={() => handleTabChange("task-create")}
            className={getLinkClasses("task-create")}
          >
            <List className="mr-3" size={18} />
             Tasks
          </button>
        </nav>
      </div>

     

      <div className="flex items-center px-4 py-3 border-t border-gray-200">
        <img
          className="w-8 h-8 rounded-full"
          src="/api/placeholder/40/40"
          alt="User profile"
        />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">Alex Johnson</p>
          <p className="text-xs text-gray-500">alex@example.com</p>
        </div>
        <button className="p-1 ml-auto text-gray-400 rounded-full hover:text-gray-500">
          <Settings size={16} />
        </button>
      </div>
    </aside>
  );
}

export default Drawer;
