import { ArrowLeft, Bell, Menu, Search } from "lucide-react";
import React from "react";

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          className="md:hidden p-2 text-gray-500 rounded-md hover:bg-gray-100"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 px-4 md:px-0">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-gray-400" size={16} />
            </div>
            <input
              type="text"
              className="block w-full py-2 pl-10 pr-3 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-0"
              placeholder="Search tasks..."
            />
          </div>
        </div>

        <div className="flex items-center ml-4 space-x-4">
          <div className="relative">
            <button className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none">
              <Bell size={20} />
            </button>
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full">
              3
            </span>
          </div>
        </div>
      </div>
      {/* <div className="px-4 py-2 bg-white border-t border-gray-200 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <a
            href="#"
            className="flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="mr-1" size={16} />
            <span className="text-sm font-medium">Back to Tasks</span>
          </a>
          <h2 className="ml-4 text-lg font-medium text-gray-800">
            Create New Task
          </h2>
        </div>
      </div> */}
    </header>
  );
}

export default Header;
