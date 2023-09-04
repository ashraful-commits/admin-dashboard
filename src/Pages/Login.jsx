import { useEffect, useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useHandleForm from "../hook/useHandleForm";
import { useLoginUserMutation } from "../features/UserSlice";

const Login = () => {
  // State variable for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //=============================== use hooks
  const { input, setInput, handleInput } = useHandleForm({
    name: "",
    password: "",
  });
  //================================== user login slice

  const [loginUser] = useLoginUserMutation();
  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //======================================== handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    loginUser(input);
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg sm:max-w-md mx-10 w-full transform transition-transform hover:scale-105">
        <div className="absolute shadow-md top-[-28px] bg-white rounded-full left-[45%] p-2 z-[999]">
          <FiUser className="text-4xl text-blue-500" /> {/* User icon */}
        </div>
        <h1 className="text-3xl font-semibold text-center mb-6 text-purple-500">
          Log In
        </h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          {/* Username input */}
          <div className="flex items-center gap-2">
            <FiUser className="text-2xl text-purple-500" /> {/* User icon */}
            <div className="relative flex-1">
              <label className="text-pink-500 font-semibold" htmlFor="username">
                Email
              </label>
              <input
                type="text"
                id="Email"
                name="email"
                value={input.email}
                onChange={handleInput}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:bg-white transition-all duration-300"
                placeholder="Your username"
                required
              />
            </div>
          </div>
          {/* Password input */}
          <div className="flex items-center gap-2">
            <FiLock className="text-2xl text-purple-500" /> {/* Lock icon */}
            <div className="relative flex-1">
              <label className="text-pink-500 font-semibold" htmlFor="password">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={input.password}
                onChange={handleInput}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:bg-white transition-all duration-300"
                placeholder="Your password"
                required
              />
              <span
                className="absolute mt-5 inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FiEye className="text-gray-400" /> // Show password icon
                ) : (
                  <FiEyeOff className="text-gray-400" /> // Hide password icon
                )}
              </span>
            </div>
          </div>
          {/* Log In button */}
          <div className="flex items-center flex-col justify-between">
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-pink-500 hover:via-red-500 hover:to-yellow-400 text-white font-semibold py-3 rounded-lg transition-all duration-300 w-full transform hover:scale-105"
            >
              Log In
            </button>
            <div className="text-gray-700 mt-3">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-blue-500">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
