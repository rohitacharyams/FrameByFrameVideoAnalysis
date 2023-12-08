// VideoLabeler.js

import React, { useState } from 'react';

const VideoLabeler = ({ labels, onLabelUpdate }) => {
  const [currentLabel, setCurrentLabel] = useState('');

  const handleLabelChange = (event) => {
    setCurrentLabel(event.target.value);
  };

  const handleLabelSubmit = () => {
    onLabelUpdate(currentLabel);
    setCurrentLabel('');
  };

  return (
    <div>
      <div>
        {labels.map((label) => (
          <div key={label.timestamp}>
            {label.timestamp} - {label.label}
          </div>
        ))}
      </div>
      <input type="text" placeholder="Enter label" value={currentLabel} onChange={handleLabelChange} />
      <button onClick={handleLabelSubmit}>Add Label</button>
    </div>
  );
};

export default VideoLabeler;
