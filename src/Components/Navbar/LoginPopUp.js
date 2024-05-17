import React, { useState, useEffect } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";

const LoginPopUp = ({ showPopUp, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., send login request)
    const response = await doSignInWithEmailAndPassword(username, password);
    console.log("Login attempted:", response);
    onClose(); // Close the popup after submit
  };

  const handleGoogleSignIn = async () => {
    // Handle Google sign in logic here
    const response = await doSignInWithGoogle();
    console.log("Google Sign In attempted:", response);
    onClose(); // Close the popup after submit
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Check if the click is outside of the popup
      if (showPopUp && !e.target.closest(".bg-white")) {
        onClose(); // Close the popup
      }
    };

    // Add event listener when the popup is shown
    if (showPopUp) {
      document.body.addEventListener("click", handleOutsideClick);
    }
    
    // Cleanup function to remove the event listener
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [showPopUp, onClose]);

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 transition duration-300 ease-in-out ${
        showPopUp
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg p-8 shadow-md relative w-96 h-96">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-0 m-4 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="bg-indigo-500 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50 w-1/2 mr-2"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="bg-red-600 text-white hover:bg-red-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 w-1/2 ml-2"
            >
              Google Sign In
            </button>
          </div>
        </form>
        <div className="text-sm text-gray-500 hover:text-gray-700 mt-6 block">
          Forgot Password?
        </div>
      </div>
    </div>
  );
};

export default LoginPopUp;
