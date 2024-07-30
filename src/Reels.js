import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const Reels = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [dancerId, setDancerId] = useState(null);
  const [keypoints, setKeypoints] = useState(null);
  const [bboxInfo, setBboxInfo] = useState([]);
  const [adminMode, setAdminMode] = useState(false);
  const [selectedDancers, setSelectedDancers] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        "https://danceai.azurewebsites.net//api/videos"
      );
      if (!response.ok) {
        console.error(`Error fetching videos: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleScroll = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setCurrentVideoIndex(0);
    }
  };

  const getVideoSrc = (videoId) => {
    return `https://danceai.azurewebsites.net//api/video/${videoId}`;
  };

  const handleLearnAndCompare = async (videoId) => {
    try {
      const response = await fetch(
        `https://danceai.azurewebsites.net//api/composite_thumbnail/${videoId}`
      );
      if (!response.ok) {
        console.error(
          `Error fetching composite thumbnail: ${response.statusText}`
        );
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setThumbnailSrc(url);

      const bboxResponse = await fetch(
        `https://danceai.azurewebsites.net//api/bbox_info/${videoId}`
      );
      const bboxData = await bboxResponse.json();
      setBboxInfo(bboxData);

      setSelectedVideoId(videoId);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching composite thumbnail or bbox info:", error);
    }
  };

  const handleThumbnailClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedTrackId = bboxInfo.find(
      (bbox) =>
        x >= bbox.bbox[0] &&
        x <= bbox.bbox[2] &&
        y >= bbox.bbox[1] &&
        y <= bbox.bbox[3]
    )?.track_id;

    if (clickedTrackId) {
      fetch(
        `https://danceai.azurewebsites.net//api/keypoints/${selectedVideoId}/${clickedTrackId}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Dancer ID:", clickedTrackId);
          console.log("Keypoints:", data);

          if (adminMode) {
            setSelectedDancers((prev) => {
              const newDancers = [
                ...prev,
                { dancerId: clickedTrackId, keypoints: data },
              ];
              console.log("New dancers length before:", newDancers);
              if (newDancers.length >= 2) {
                console.log("New dancers length is:", newDancers);
                setModalIsOpen(false);
              }
              return newDancers;
            });
          } else {
            setDancerId(clickedTrackId);
            setKeypoints(data);
            setModalIsOpen(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching dancer keypoints:", error);
        });
    }
  };

  useEffect(() => {
    if (selectedDancers.length === 2) {
      // Perform comparison between selectedDancers[0] and selectedDancers[1]
      console.log("Comparing dancers:", selectedDancers);
      // Add your comparison logic here
    }
  }, [selectedDancers]);

  return (
    <div onScroll={handleScroll} className="overflow-y-scroll h-screen">
      <div className="flex justify-between p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Dance Reels</h1>
      </div>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div
            key={index}
            className={`w-screen h-screen ${
              index === currentVideoIndex ? "block" : "hidden"
            }`}
          >
            <video
              src={getVideoSrc(video.video_id)}
              controls
              autoPlay={true}
              className="w-full h-full"
            />
            <button
              onClick={() => handleLearnAndCompare(video.video_id)}
              className="absolute bottom-4 left-4 px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded"
            >
              Learn and Compare
            </button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={() => setAdminMode(!adminMode)}
        className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
      >
        {adminMode ? "Exit Admin Mode" : "Enter Admin Mode"}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Select a Dancer"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2 className="text-lg font-bold mb-4">Select a Dancer</h2>
        <img
          src={thumbnailSrc}
          alt="Composite Thumbnail"
          onClick={handleThumbnailClick}
          className="cursor-pointer"
        />
        <button
          onClick={() => setModalIsOpen(false)}
          className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Reels;
