import React from "react";
import { NavLink } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <div className="w-[164px] bg-white min-h-screen shadow-lg transition-all duration-300 ease-in-out font-medium text-sm">
      <nav className="sticky top-[50px] py-6 px-4">
        <button className="w-full bg-transparent py-0">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center text-[#3a3a3a] py-3 px-4 transition-all duration-200 ${
                isActive
                  ? "font-semibold text-[#007bff] bg-[#f8f8f8] border-l-4 border-[#007bff]"
                  : "hover:bg-[#f0f0f0] hover:text-[#007bff]"
              } rounded-md`
            }
          >
            <p>Home</p>
          </NavLink>
        </button>

        <div className="">
          <button className="w-full bg-transparent py-0">
            <NavLink
              to="/Questions"
              className={({ isActive }) =>
                `flex items-center text-[#3a3a3a] py-3 px-4 transition-all duration-200 ${
                  isActive
                    ? "font-semibold text-[#007bff] bg-[#f8f8f8] border-l-4 border-[#007bff]"
                    : "hover:bg-[#f0f0f0] hover:text-[#007bff]"
                } rounded-md`
              }
            >
              <p>Questions</p>
            </NavLink>
          </button>

          <button className="w-full bg-transparent py-0">
            <NavLink
              to="/Users"
              className={({ isActive }) =>
                `flex items-center text-[#3a3a3a] py-3 px-4 transition-all duration-200 ${
                  isActive
                    ? "font-semibold text-[#007bff] bg-[#f8f8f8] border-l-4 border-[#007bff]"
                    : "hover:bg-[#f0f0f0] hover:text-[#007bff]"
                } rounded-md`
              }
            >
              <p>Users</p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
