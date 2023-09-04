import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useHandleForm from "../hook/useHandleForm"; // Import a custom hook for handling form input
import { useCreateUserMutation } from "../features/UserSlice"; // Import a mutation function from a UserSlice

const Register = () => {
  // State variables for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Import the custom hook for handling form input
  const { input, setInput, handleInput } = useHandleForm({
    name: "",
    email: "",
    password: "",
  });

  // Import the createUser mutation function from UserSlice
  const [createUser] = useCreateUserMutation();

  // Function to toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    }
  };

  // Use the "useNavigate" hook from react-router-dom to navigate between routes
  const navigate = useNavigate();

  // Handle form submission
  const handleFromSubmit = (e) => {
    e.preventDefault();
    // Call the createUser mutation function with the input data
    createUser(input);
    // Navigate to the login page after successful registration
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r px-8 from-purple-400 via-pink-500 to-red-500 min-h-screen flex flex-col justify-center items-center relative">
      <div className="bg-white rounded-lg hover:scale-105 transition-all duration-200 relative p-6 shadow-lg sm:max-w-md mx-10 w-full">
        <div className="absolute shadow-md top-[-27px] bg-white rounded-full left-[45%] p-2 z-[999]">
          <FiUser className="text-4xl text-blue-500" /> {/* User icon */}
        </div>
        <h1 className="text-3xl font-semibold text-center mb-6 text-purple-500">
          Sign Up
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleFromSubmit}>
          {/* Name input */}
          <div className="flex items-center gap-2">
            <FiUser className="text-2xl text-purple-500" /> {/* User icon */}
            <div className="relative flex-1">
              <label className="text-pink-500 font-semibold" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={handleInput}
                className="w-full px-4 py-2 bg-purple-100 rounded-lg focus:outline-none focus:ring focus:bg-white"
                placeholder="Your name please"
                required
                autoComplete="off" // Disable autocomplete
              />
            </div>
          </div>
          {/* Email input */}
          <div className="flex items-center gap-2">
            <FiMail className="text-2xl text-purple-500" /> {/* Email icon */}
            <div className="relative flex-1">
              <label className="text-pink-500 font-semibold" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={input.email}
                onChange={handleInput}
                name="email"
                className="w-full px-4 py-2 bg-blue-100 rounded-lg focus:outline-none focus:ring focus:bg-white"
                placeholder="Your email please"
                required
                autoComplete="off" // Disable autocomplete
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
                className="w-full px-4 py-2 bg-yellow-100 rounded-lg focus:outline-none focus:ring focus:bg-white"
                placeholder="Your password please"
                minLength="8"
                required
                autoComplete="off" // Disable autocomplete
              />
              <span
                className="absolute inset-y-0 mt-5 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => togglePasswordVisibility("password")}
              >
                {showPassword ? (
                  <FiEye className="text-gray-400" /> // Show password icon
                ) : (
                  <FiEyeOff className="text-gray-400" /> // Hide password icon
                )}
              </span>
            </div>
          </div>

          {/* Terms and Conditions checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="mr-2"
              required
            />
            <label className="text-pink-500">
              I accept the{" "}
              <a href="#" className="text-pink-500">
                Terms and Conditions
              </a>
            </label>
          </div>
          {/* Sign Up button */}
          <div className="flex items-center flex-col justify-between">
            <button
              type="submit"
              className="bg-gradient-to-r hover:scale-105  from-yellow-400 via-red-500 to-pink-500 hover:from-pink-500 hover:via-red-500 hover:to-yellow-400 text-white font-semibold py-3 rounded-lg transition-all duration-300 w-full"
            >
              Sign Up
            </button>
            <div className="text-gray-700 mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-pink-500">
                Log in
              </Link>
            </div>
          </div>
        </form>
        {/* Social media links */}
        <div className="mt-6 text-center">
          <a href="#" className="text-pink-500 mr-4">
            <i className="fab fa-facebook-square text-xl"></i>
          </a>
          <a href="#" className="text-pink-500 mr-4">
            <i className="fab fa-linkedin text-xl"></i>
          </a>
          <a href="#" className="text-pink-500 mr-4">
            <i className="fab fa-twitter-square text-xl"></i>
          </a>
          <a href="#" className="text-pink-500">
            <i className="fab fa-instagram-square text-xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
