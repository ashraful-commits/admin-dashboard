import { useEffect, useState } from "react";
import logo from "../../public/devloper ashraful.png";
import user from "../../public/user.jpg";
import { AiFillBell } from "react-icons/ai";
import { useMeQuery, useUserLogoutMutation } from "../features/UserSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const [userLogout] = useUserLogoutMutation();
  const { data } = useMeQuery();
  const navigate = useNavigate();
  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };
  useEffect(() => {}, [data]);
  return (
    <div className="w-full fixed z-[9999] top-0 left-0 px-4 py-2 flex justify-between bg-orange-200 items-center">
      <div className="logo w-[20%] flex gap-5  justify-between ">
        <img className="w-[30px] shrink-0 h-[30px]" src={logo} alt="Logo" />
      </div>
      <div className="search w-[70%] flex justify-start">
        <input
          className="w-full rounded-full py-1 focus:outline-none px-4 text-gray-900 bg-white"
          type="search"
          placeholder="Search"
        />
      </div>
      <div className="profile-notification w-[20%] flex justify-end items-center gap-5 ">
        <div className="notification">
          <button>
            <AiFillBell />
          </button>
        </div>
        <div className="profile w-auto   z-[99] relative mr-3">
          {dropdown && (
            <div className="dropdown-menu bg-blue-500 absolute top-[100%] rounded-xl right-[20px] w-[250px] p-5  shadow-lg z-[999999]">
              <h1 className="text-white font-bold text-xl">
                {data?.user.name}
              </h1>
              <button
                onClick={handleLogout}
                className="mt-5 bg-white px-4 py-1 rounded-full hover:bg-blue-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          )}
          <div
            onClick={() => setDropdown(!dropdown)}
            className="flex rounded-full cursor-pointer overflow-hidden"
          >
            <img
              className="w-[30px] shrink-0 rounded-full h-[30px]"
              src={user}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
