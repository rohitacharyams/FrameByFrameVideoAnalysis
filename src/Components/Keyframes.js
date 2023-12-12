// components/Keyframes.js
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { setKeyframes, setKeyframeBool } from '../redux/actions';

const Keyframes = ({ currentFrame, keyframes, keyframeBool, setKeyframes, setKeyframeBool }) => {
  const [KeyFrameTypeNumber, setKeyFrameTypeNumber] = useState({keyFrameInFrameNmber:currentFrame, keyFrameOutFrameNmber:currentFrame});
  const handleAddKeyframeIn = () => {
    if(KeyFrameTypeNumber.keyFrameOutFrameNmber === currentFrame)
    {
      console.log("please increase the frame number in order to start a new keyFrame as one already closed on this one");
      return;
    }
    if (!keyframeBool.keyFrameOutActive) {
      console.log('A keyframe is already active, first close that and then add another keyframe');
      return;
    }
    setKeyFrameTypeNumber({keyFrameInFrameNmber:currentFrame, keyFrameOutFrameNmber:KeyFrameTypeNumber.keyFrameOutFrameNmber});
    setKeyframes([...keyframes, { frame: currentFrame, type: 'in' }]);
    setKeyframeBool({ keyFrameInActive: true, keyFrameOutActive: false });
  };

  const handleAddKeyframeOut = () => {
    if(KeyFrameTypeNumber.keyFrameInFrameNmber === currentFrame)
    {
      console.log("please increase the frame number in order to start a new keyFrame as one already closed on this one");
      return;
    }
    if (!keyframeBool.keyFrameInActive) {
      console.log('Keyframe is already closed, first open one and then try closing it');
      return;
    }
    setKeyFrameTypeNumber({keyFrameInFrameNmber:KeyFrameTypeNumber.keyFrameInFrameNmber, keyFrameOutFrameNmber:currentFrame});
    setKeyframes([...keyframes, { frame: currentFrame, type: 'out' }]);
    setKeyframeBool({ keyFrameInActive: false, keyFrameOutActive: true });
  };

  const handleLabellingDone = () => {
    // Assuming you have a backend endpoint for saving keyframes
    fetch('http://localhost:5000/save_keyframes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyframes }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Keyframes saved successfully:', data);
      })
      .catch(error => console.error('Error saving keyframes:', error));
  };

  return (
    <div>
      <button onClick={handleAddKeyframeIn} disabled={!keyframeBool.keyFrameOutActive}>
        Add Keyframe In
      </button>
      <button onClick={handleAddKeyframeOut} disabled={!keyframeBool.keyFrameInActive}>
        Add Keyframe Out
      </button>

      <div>
        <h3>Keyframes:</h3>
        <ul>
          {keyframes.map((keyframe, index) => (
            <li key={index}>{`Frame ${keyframe.frame} - Type: ${keyframe.type}`}</li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={handleLabellingDone}>Labelling Done</button>
      </div>

    </div>
  );
};

const mapStateToProps = (state) => ({
  currentFrame: state.currentFrame,
  keyframes: state.keyframes,
  keyframeBool: state.keyframeBool,
});

const mapDispatchToProps = {
  setKeyframes,
  setKeyframeBool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Keyframes);
