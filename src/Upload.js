import React, { useState } from "react";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    console.log("Say HII");
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", selectedFile);
    console.log("FIlename is:", selectedFile);
    await fetch("https://danceai.us-cdp2.choreoapps.dev/api/upload", {
      method: "POST",
      body: formData,
    });
    window.location.href = "/";
  };

  return (
    <div>
      <h2>Upload a Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
