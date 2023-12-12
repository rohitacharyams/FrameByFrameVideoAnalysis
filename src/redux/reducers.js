// redux/reducers.js
import {
    SET_VIDEO_INFO,
    SET_FRAME_RATE,
    SET_NUM_OF_FRAMES_TO_SKIP,
    SET_CURRENT_FRAME,
    SET_KEYFRAMES,
    SET_KEYFRAME_BOOL,
  } from './actions';
  
  const initialState = {
    videoInfo: {
      videoUrl: '',
    },
    frameRate: 1,
    numOfFramesToSkip: 1,
    currentFrame: 0,
    keyframes: [],
    keyframeBool: {
      keyFrameInActive: false,
      keyFrameOutActive: true,
    },
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_VIDEO_INFO:
        console.log('SET_VIDEO_INFO action dispatched with payload:', action.payload);
        return { ...state, videoInfo: action.payload };
      case SET_FRAME_RATE:
        console.log('SET_FRAME_RATE action dispatched with payload:', action.payload);
        return {...state, frameRate: action.payload};
      case SET_NUM_OF_FRAMES_TO_SKIP:
        return { ...state, numOfFramesToSkip: action.payload };
      case SET_CURRENT_FRAME:
        return { ...state, currentFrame: action.payload };
      case SET_KEYFRAMES:
        return { ...state, keyframes: action.payload };
      case SET_KEYFRAME_BOOL:
        return { ...state, keyframeBool: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  