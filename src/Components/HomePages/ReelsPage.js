import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import VideoContainer from "./VideoContainer";
import "./ReelsPage.css"; // Import CSS for animations

const ReelsPage = () => {
  const initialVideos = ["xRU0mQiL1yA", "lU92_SvwIkk", "TNuH93ucwt4"];
  const additionalVideos = ["vUZWe5kAsSM", "AbTlKgAByQo", "mOrnlgZ-PnI"];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const nextVideo = () => {
    if (
      currentVideoIndex <
      initialVideos.length + additionalVideos.length - 1
    ) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prevIndex) => prevIndex - 1);
    }
  };

  const getCurrentVideoId = () => {
    if (currentVideoIndex < initialVideos.length) {
      return initialVideos[currentVideoIndex];
    } else {
      return additionalVideos[currentVideoIndex - initialVideos.length];
    }
  };

  return (
    <div className="grid flex-col h-screen bg-gray-100 items-center">
      <div className="grid justify-center row-span-1">
        <button
          onClick={prevVideo}
          className="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={currentVideoIndex === 0}
        >
          Prev
        </button>
      </div>
      <div className="grid justify-center row-span-12">
        <div className="video-slider">
          <CSSTransition
            key={getCurrentVideoId()}
            classNames="slide"
            timeout={500}
          >
            <div className="video-slide">
              <VideoContainer videoId={getCurrentVideoId()} />
            </div>
          </CSSTransition>
        </div>
      </div>
      <div className="grid justify-center row-span-1 pb-14">
        <button
          onClick={nextVideo}
          className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={
            currentVideoIndex ===
            initialVideos.length + additionalVideos.length - 1
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReelsPage;
