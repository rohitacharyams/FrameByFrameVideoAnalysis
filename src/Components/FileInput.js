import React from 'react';
import { connect } from 'react-redux';
import { setVideoInfo, setFrameRate, setVideoFilename, setThumbnailUrl } from '../redux/actions';

const FileInput = ({ setVideoInfo, setFrameRate, setVideoFilename }) => {
  const handleFileChange = (event) => {
    console.log("Clickeddddd")
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('video', file);
      setVideoFilename(file.name);
      fetch('http://localhost:61987/upload', {
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
          fetch(`http://localhost:61987/get_frame_info`, {
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

const mapStateToProps = (state) => ({
    frameRate: state.frameRate,
    videoInfo: state.setVideoInfo,
    videoFilename: state.videoFilename,
    thumbnailUrl: state.thumbnailUrl,
});

const mapDispatchToProps = {
  setVideoInfo,
  setFrameRate,
  setVideoFilename,
  setThumbnailUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileInput);
