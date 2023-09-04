import { useEffect, useState } from "react";
import logo from "../../public/devloper ashraful.png";
import user from "../../public/user.jpg";
import { AiFillBell } from "react-icons/ai";
import { useMeQuery, useUserLogoutMutation } from "../features/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

// Header component responsible for displaying the website's header.
const Header = () => {
  // State to manage the visibility of the user dropdown menu.
  const [dropdown, setDropdown] = useState(false);

  // Mutation to handle user logout.
  const [userLogout, { isError, isLoading, error, isSuccess }] =
    useUserLogoutMutation();

  // Query to get the user's data.
  const { data } = useMeQuery();

  // React Router's navigation function.
  const navigate = useNavigate();

  // Function to handle user logout and navigate to the login page.
  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  // Empty useEffect with 'navigate' as a dependency to avoid warning.
  useEffect(() => {}, [data]);

  return (
    <div className="w-full fixed z-[9999] top-0 left-0 px-4 py-2 flex justify-between bg-orange-200 items-center">
      {/* Logo */}
      <div className="logo w-[20%] flex gap-5  justify-between ">
        <Link to="/">
          {" "}
          <img className="w-[30px] shrink-0 h-[30px]" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Search Input */}
      <div className="search w-[70%] flex justify-start">
        <input
          className="w-full rounded-full py-1 focus:outline-none px-4 text-gray-900 bg-white"
          type="search"
          placeholder="Search"
        />
      </div>

      {/* Notification and User Profile */}
      <div className="profile-notification w-[20%] flex justify-end items-center gap-5 ">
        {/* Notification Bell */}
        <div className="notification">
          <button>
            <AiFillBell />
          </button>
        </div>

        {/* User Profile Dropdown */}
        <div className="profile w-auto   z-[99] relative mr-3">
          {dropdown && (
            <div className="dropdown-menu bg-white absolute border-2 border-pink-500 top-[100%] rounded-xl right-[20px] w-[300px] p-5  shadow-lg z-[999999]">
              <h1 className="text-white font-bold text-lg text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 gap-2">
                <span className="flex gap-2 items-center">
                  <FaUser className="text-blue-500" /> {data?.user.name}{" "}
                </span>
                <span className="text-xs">({data?.user?.role?.name})</span>
              </h1>
              <button
                onClick={handleLogout}
                className="mt-5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white px-4 py-1 rounded-full hover:bg-blue-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          )}

          {/* User Profile Image */}
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
