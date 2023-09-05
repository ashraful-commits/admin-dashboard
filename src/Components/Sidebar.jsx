import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineExperiment,
  AiOutlineDoubleRight,
  AiOutlineDoubleLeft,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  // State to control sidebar visibility
  const [sidebar, setSidebar] = useState(true);

  return (
    <div
      // Sidebar container with dynamic width and updated gradient background
      className={`h-full fixed top-[5%] z-[9999] left-0 transition-all min-h-screen duration-200 overflow-hidden bg-gradient-to-b from-orange-500 via-purple-500 to-blue-500 w-100% ${
        sidebar
          ? "w-[50px] md:w-[50px] lg:w-[50px]" // Collapsed state
          : "w-[200px] md:w-[200px] lg:w-[220px]" // Expanded state
      }`}
    >
      <div className="bg-white flex justify-end items-center p-2">
        {/* Sidebar toggle button */}
        <button onClick={() => setSidebar(!sidebar)} className="text-teal-500">
          {sidebar ? <AiOutlineDoubleRight /> : <AiOutlineDoubleLeft />}
        </button>
      </div>
      <ul className="flex flex-col items-center justify-center py-10 gap-5 w-full px-3">
        {/* Dashboard Link */}
        <li className="w-full text-left pr-5 hover:bg-white rounded-full transition-all duration-100">
          <Link
            className="text-md lg:text-lg text-teal-100 hover:text-teal-700 font-bold w-[200px] flex gap-5 items-center"
            to="/"
          >
            <AiOutlineHome className="bg-white p-1 text-cyan-700 text-2xl rounded-full" />{" "}
            Dashboard
          </Link>
        </li>

        {/* User Link */}
        <li className="w-full text-left pr-5 hover:bg-white rounded-full transition-all duration-100">
          <Link
            className="text-md lg:text-lg text-teal-100 hover:text-teal-700 font-bold w-[200px] flex gap-5 items-center"
            to="/user"
          >
            <AiOutlineUser className="bg-white p-1 text-cyan-700 text-2xl rounded-full" />
            User
          </Link>
        </li>

        {/* Role Link */}
        <li className="w-full text-left pr-5 hover:bg-white rounded-full transition-all duration-100">
          <Link
            className="text-md lg:text-lg text-teal-100 hover:text-teal-700 font-bold w-[200px] flex gap-5 items-center"
            to="/role"
          >
            <AiOutlineBook className="bg-white p-1 text-cyan-700 text-2xl rounded-full" />
            Role
          </Link>
        </li>

        {/* Permission Link */}
        <li className="w-full text-left pr-5 hover:bg-white rounded-full transition-all duration-100">
          <Link
            className="text-md lg:text-lg text-teal-100 hover:text-teal-700 font-bold w-[200px] flex gap-5 items-center"
            to="/permission"
          >
            <AiOutlineExperiment className="bg-white p-1 text-cyan-700 text-2xl rounded-full" />
            Permission
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
