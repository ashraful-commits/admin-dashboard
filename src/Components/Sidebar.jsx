import {
  AiFillExperiment,
  AiFillHome,
  AiFillRead,
  AiOutlineDoubleRight,
  AiOutlineUser,
  AiOutlineDoubleLeft,
} from "react-icons/ai";
import { Link } from "react-router-dom";

import { useState } from "react";

const Sidebar = () => {
  const [sidebar, SetSidebar] = useState(true);

  return (
    <div
      className={`h-full fixed top-[5%] z-[9999] left-0 transition-all min-h-screen duration-200 overflow-hidden bg-blue-300 w-100% ${
        sidebar
          ? "w-[50px]  md:w-[50px] lg:w-[50px]"
          : "w-[300px] md:w-[300px] lg:w-[250px] "
      }`}
    >
      <div className=" bg-blue-500 flex justify-end  items-center p-2">
        <button onClick={() => SetSidebar(!sidebar)} className="text-white">
          {sidebar ? <AiOutlineDoubleRight /> : <AiOutlineDoubleLeft />}
        </button>
      </div>
      <ul className="flex flex-col items-center justify-center py-10 gap-5 w-full px-3">
        <li className=" w-full text-left pr-5 rounded-full  hover:bg-white transition-all duration-100">
          <Link
            className="text-md lg:text-lg text-white hover:text-gray-700 font-bold w-[200px]  flex gap-5 items-center"
            to="/"
          >
            <AiFillHome className="bg-blue-500 p-1  text-white text-2xl rounded-full " />{" "}
            Dashboard
          </Link>
        </li>
        <li className=" w-full text-left pr-5 rounded-full  hover:bg-white transition-all duration-100">
          <Link
            className="text-md lg:text-lg text-white hover:text-gray-700 font-bold w-[200px] flex gap-5 items-center"
            to="/user"
          >
            <AiOutlineUser className="bg-blue-500 p-1  text-white text-2xl rounded-full " />
            User
          </Link>
        </li>
        <li className=" w-full text-left pr-5 rounded-full  hover:bg-white transition-all duration-100">
          <Link
            className="text-md lg:text-lg text-white hover:text-gray-700 font-bold w-[200px] flex gap-5 items-center"
            to="/role"
          >
            <AiFillRead className="bg-blue-500 p-1  text-white text-2xl rounded-full " />
            Role
          </Link>
        </li>
        <li className=" w-full text-left pr-5 rounded-full  hover:bg-white transition-all duration-100">
          <Link
            className="text-md lg:text-lg text-white hover:text-gray-700 font-bold w-[200px] flex gap-5 items-center"
            to="/permission"
          >
            <AiFillExperiment className="bg-blue-500 p-1  text-white text-2xl rounded-full " />
            Permission
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
