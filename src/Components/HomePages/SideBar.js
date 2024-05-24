import React from "react";

const SideBar = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white">
      <div className="px-4 py-2">
        <h1 className="text-2xl font-semibold">Sidebar</h1>
      </div>
      <div className="border-t border-gray-700"></div>
      <div className="px-4 py-2">
        {options.slice(0, 2).map((option, index) => (
          <div key={index} className="py-2">
            <div className="block px-2 py-1 hover:bg-gray-700 rounded cursor-pointer">
              {option}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700"></div>
      <div className="px-4 py-2">
        {options.slice(2).map((option, index) => (
          <div key={index} className="py-2">
            <div className="block px-2 py-1 hover:bg-gray-700 rounded cursor-pointer">
              {option}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
