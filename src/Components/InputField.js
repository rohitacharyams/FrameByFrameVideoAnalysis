// components/FileUploadField.js
import React from 'react';

const InputFiled = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    // You can perform further actions with the selected file here
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default InputFiled;
