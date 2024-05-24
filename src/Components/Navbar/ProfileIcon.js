import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../firebase/authContext";
import { doSignOut } from "../../firebase/auth";

const settings = ["Profile", "Dashboard", "Logout"];

function ProfileIcon() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const menuRef = useRef(null);
  const { currentUser } = useAuth();
  const [imageUrl, setImageUrl] = useState(currentUser?.photoURL);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting) => {
    console.log(`${setting} clicked`);
    switch (setting) {
      case "Profile":
        break;
      case "Dashboard":
        break;
      case "Logout":
        doSignOut();
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  useEffect(() => {
    setImageUrl(currentUser?.photoURL);
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleCloseUserMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button onClick={handleOpenUserMenu} className="focus:outline-none">
        <img
          className="w-10 h-10 rounded-full"
          src={imageUrl ? imageUrl : "https://via.placeholder.com/150"}
          alt="User Avatar"
        />
      </button>
      {anchorElUser && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg  z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          {settings.map((setting) => (
            <button
              key={setting}
              onClick={() => handleSettingClick(setting)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left hover:shadow-md rounded-none"
            >
              {setting}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;
