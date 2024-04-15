import React from 'react';
import VideoBackground from './VideoBackground'
import FeaturesShowcase from './FeatureShowcase'

const HomePage = () => {
  return (
    <div>
      <VideoBackground />
      <div style={{ position: 'relative', zIndex: 2, color: 'white' }}>
        {/* Place the FeaturesShowcase component inside a container div if you need to adjust its positioning over the video */}
        <FeaturesShowcase />
      </div>
    </div>
  );
};

export default HomePage;
