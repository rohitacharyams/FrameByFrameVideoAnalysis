import React from 'react';
import { useRecoilState } from 'recoil';
import { videoInfoAtom, frameRateAtom, videoFilenameAtom, thumbnailUrlAtom } from '../Recoil/atoms';

const FileInput = () => {
  // Recoil states :
  const [videoInfo, setVideoInfo] = useRecoilState(videoInfoAtom);
  const [frameRate, setFrameRate] = useRecoilState(frameRateAtom);
  const [videoFilename, setVideoFilename] = useRecoilState(videoFilenameAtom);
  const [thumbnailUrl, setThumbnailUrl] = useRecoilState(thumbnailUrlAtom);


  const handleFileChange = (event) => {
    console.log("Clickeddddd")
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('video', file);
      setVideoFilename(file.name);
      console.log("File name is ", file.name);
      fetch('http://localhost:51040/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {

          if (!response.ok) {
            throw new Error('Failed to upload video');
          }
          return response.json();
        })
        .then((data) => {
          setVideoInfo({
            videoUrl: data.videoUrl,
          });
          setThumbnailUrl(data.thumbnailUrl);
          fetch(`http://localhost:51040/get_frame_info`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ videoFilename: file.name }),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to get frame info');
              }
              return response.json();
            })
            .then(data => {
              const frameRate = parseInt(data.frameRate);
              setFrameRate(frameRate);
            })
            .catch(error => console.error('Error getting frame rate:', error));
        })
        .catch((error) => console.error('Error uploading video:', error));
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
    </div>
  );
};

export default FileInput;
