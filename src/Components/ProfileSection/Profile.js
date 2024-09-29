import React from "react";

const ProfilePage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Part A - User Details (Top) */}
      <div className="flex flex-col sm:flex-row items-center p-8 border-b border-gray-300">
        {/* User Image */}
        <div className="mb-4 sm:mb-0 sm:mr-6">
          <img
            src="https://via.placeholder.com/150"
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        {/* User Info */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold">John Doe</h2>
          <p className="text-gray-600">"Adventurer & Filmmaker"</p>
          <p className="mt-2 text-gray-500">
            <span className="font-bold">Interests:</span> Travel, Photography,
            Filmmaking, Tech
          </p>
        </div>
      </div>

      {/* New Section - Buttons (Middle) */}
      <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 py-4 ">
        <button className="w-full sm:w-auto bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition truncate">
          My Videos
        </button>
        <button className="w-full sm:w-auto bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition truncate">
          Recent Activity
        </button>
      </div>

      {/* Part B - Recently Viewed Videos (Bottom) */}
      <div className="flex-1 p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
        <VideoTile
          title="Video 1"
          thumbnail="https://via.placeholder.com/200"
        />
        <VideoTile
          title="Video 2"
          thumbnail="https://via.placeholder.com/200"
        />
        <VideoTile
          title="Video 3"
          thumbnail="https://via.placeholder.com/200"
        />
        <VideoTile
          title="Video 4"
          thumbnail="https://via.placeholder.com/200"
        />
        <VideoTile
          title="Video 5"
          thumbnail="https://via.placeholder.com/200"
        />
        <VideoTile
          title="Video 6"
          thumbnail="https://via.placeholder.com/200"
        />
        <VideoTile
          title="Video 1"
          thumbnail="https://via.placeholder.com/200"
        />
        <VideoTile
          title="Video 2"
          thumbnail="https://via.placeholder.com/200"
        />
        <VideoTile
          title="Video 3"
          thumbnail="https://via.placeholder.com/200"
        />
        <VideoTile
          title="Video 4"
          thumbnail="https://via.placeholder.com/200"
        />
        <VideoTile
          title="Video 5"
          thumbnail="https://via.placeholder.com/200"
        />
        <VideoTile
          title="Video 6"
          thumbnail="https://via.placeholder.com/200"
        />
      </div>
    </div>
  );
};

// VideoTile Component
const VideoTile = ({ title, thumbnail }) => {
  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md w-80 h-52">
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      <div className="p-1">
        <p className="text-xs text-gray-700">{title}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
