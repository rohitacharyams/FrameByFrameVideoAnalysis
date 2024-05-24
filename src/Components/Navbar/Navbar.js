import { useState } from "react";
import LoginPopUp from "./LoginPopUp";
import SignUpPopUp from "./SignUpPopUp";
import { useAuth } from "../../firebase/authContext";
import ProfileIcon from "./ProfileIcon";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "Labeling", "Products", "Pricing", "Contact"];

function Navbar() {
  const [showLoginPopUp, setShowLoginPopUp] = useState(false);
  const [showSignUpPopUp, setShowSignUpPopUp] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleOpenLoginPopUp = () => {
    setShowLoginPopUp(true);
  };

  const handleCloseLoginPopUp = () => {
    setShowLoginPopUp(false);
  };

  const handleOpenSignUpPopUp = () => {
    setShowSignUpPopUp(true);
  };

  const handleCloseSignUpPopUp = () => {
    setShowSignUpPopUp(false);
  };

  const handleNavigate = (page) => {
    navigate(`/${page.toLowerCase()}`);
  };

  return (
    <nav className="bg-white w-full px-4 py-2 flex justify-between">
      <div className="flex items-center">
        <div className="text-xl font-bold text-gray-800">Dance.AI</div>
      </div>

      <ul className="hidden md:flex space-x-4">
        {/* Add dynamic elements from the pages array if needed */}
        {pages.map((page) => (
          <li key={page}>
            <div
              onClick={() => handleNavigate(page)}
              className="px-3 py-2 rounded-full hover:bg-gray-100"
            >
              {page}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center md:space-x-2">
        <div className={`${isLoggedIn ? "block" : "hidden"}`}>
          <ProfileIcon />
        </div>
        <div
          className={`${
            isLoggedIn ? "hidden" : "block"
          } px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-300 cursor-pointer`}
          onClick={handleOpenLoginPopUp}
        >
          Login
        </div>
        <div>
          {showLoginPopUp && (
            <LoginPopUp
              showPopUp={showLoginPopUp}
              onClose={handleCloseLoginPopUp}
            />
          )}
        </div>
        <div
          className={`${
            isLoggedIn ? "hidden" : "block"
          } px-3 py-2 rounded-full bg-violet-500 text-white hover:bg-violet-700 cursor-pointer`}
          onClick={handleOpenSignUpPopUp}
        >
          Sign Up
        </div>
        <div>
          {showSignUpPopUp && (
            <SignUpPopUp
              showPopUp={showSignUpPopUp}
              onClose={handleCloseSignUpPopUp}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
