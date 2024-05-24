import React from "react";

const VideoContainer = ({ videoId }) => {
  return (
    <div className="flex justify-center">
      <iframe
        width="900"
        height="900"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video"
      ></iframe>
    </div>
  );
};

export default VideoContainer;
