import { useState } from "react";
import LoginPopUp from "./LoginPopUp";
import SignUpPopUp from "./signUpPopUp";

const pages = ["Home", "About", "Products", "Pricing", "Contact"];

function Navbar() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);

  const handleOpenLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const handleOpenSignUpPopup = () => {
    setShowSignUpPopup(true);
  }

  const handleCloseSignUpPopup = () => {
    setShowSignUpPopup(false);
  }



  return (
    <nav className="bg-white w-full px-4 py-2 flex justify-between">
      <div className="flex items-center">
        <div className="text-xl font-bold text-gray-800">Dance.AI</div>
      </div>

      <ul className="hidden md:flex space-x-4">
        {/* Add dynamic elements from the pages array if needed */}
        {pages.map((page) => (
          <li key={page}>
            <div className="px-3 py-2 rounded-full hover:bg-gray-100">
              {page}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center md:space-x-2">
        <div
          className="px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-300 cursor-pointer"
          onClick={handleOpenLoginPopup}
        >
          Login
        </div>
        <div>
          {showLoginPopup && (
            <LoginPopUp
              showPopup={showLoginPopup}
              onClose={handleCloseLoginPopup}
            />
          )}
        </div>
        <div
          className="px-3 py-2 rounded-full bg-violet-500 text-white hover:bg-violet-700 cursor-pointer"
          onClick={handleOpenSignUpPopup}
        >
          Sign Up
        </div>
        <div>
          {showSignUpPopup && (
            <SignUpPopUp
              showPopup={showSignUpPopup}
              onClose={handleCloseSignUpPopup}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
