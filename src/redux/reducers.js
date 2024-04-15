// redux/reducers.js
import {
    SET_VIDEO_INFO,
    SET_FRAME_RATE,
    SET_NUM_OF_FRAMES_TO_SKIP,
    SET_CURRENT_FRAME,
    SET_KEYFRAMES,
    SET_KEYFRAME_BOOL,
    SET_VIDEO_FILENAME,
    SET_THUMBNAIL_URL,
    SET_STEP_FRAMES,
    SET_VIDEO_STATE,
    UPDATE_DISPLAYED_STEP,
  } from './actions';
  
  const initialState = {
    videoInfo: {
      videoUrl: '',
    },
    frameRate: 1,
    numOfFramesToSkip: 1,
    currentFrame: 1,
    keyframes: [],
    keyframeBool: {
      keyFrameInActive: false,
      keyFrameOutActive: true,
    },
    videoFilename: '',
    thumbnailUrl: '',
    stepFrames: {startFrame: 1, endFrame: 1},
    videoState: {currentState: true, frame: 3},
    updateDisplayedStep: {frameNumber: 1},
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_STEP_FRAMES:
        return {...state, stepFrames: action.payload};
      case SET_VIDEO_STATE:
        return {
          ...state,
          videoState: action.payload,
          // If a callback exists, execute it with the dispatch function
          ...(action.callback && { callback: action.callback(state.dispatch) }),
        };
      case UPDATE_DISPLAYED_STEP:
        console.log("The updated displayed step number is:", action.payload);
        return state;
      case SET_VIDEO_INFO:
        return { ...state, videoInfo: action.payload };
      case SET_FRAME_RATE:
        return {...state, frameRate: action.payload};
      case SET_VIDEO_FILENAME:
        // console.log('SET_VIDEO_FILENAME action dispatched with payload:', action.payload);
        return {...state, videoFilename: action.payload};
      case SET_NUM_OF_FRAMES_TO_SKIP:
        return { ...state, numOfFramesToSkip: action.payload };
      case SET_CURRENT_FRAME:
        console.log('SET_CURRENT_FRAME action dispatched with payload:', action.payload);
        return { ...state, currentFrame: action.payload };
      case SET_KEYFRAMES:
        return { ...state, keyframes: action.payload };
      case SET_KEYFRAME_BOOL:
        return { ...state, keyframeBool: action.payload };
      case SET_THUMBNAIL_URL:
        return { ...state, thumbnailUrl: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  