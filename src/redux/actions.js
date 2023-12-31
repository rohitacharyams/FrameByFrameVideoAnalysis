// redux/actions.js
export const SET_VIDEO_INFO = 'SET_VIDEO_INFO';
export const SET_FRAME_RATE = 'SET_FRAME_RATE';
export const SET_NUM_OF_FRAMES_TO_SKIP = 'SET_NUM_OF_FRAMES_TO_SKIP';
export const SET_CURRENT_FRAME = 'SET_CURRENT_FRAME';
export const SET_KEYFRAMES = 'SET_KEYFRAMES';
export const SET_KEYFRAME_BOOL = 'SET_KEYFRAME_BOOL';
export const SET_VIDEO_FILENAME = 'SET_VIDEO_FILENAME';
export const SET_THUMBNAIL_URL = 'SET_THUMBNAIL_URL';
export const SET_STEP_FRAMES = 'SET_STEP_FRAMES';

export const setStepFrames = (startFrame, endFrame) => ({
  type: SET_STEP_FRAMES,
  payload: { startFrame, endFrame },
});

export const setThumbnailUrl = (thumbnailUrl) => ({
  type: SET_THUMBNAIL_URL,
  payload: thumbnailUrl,
});

export const setVideoInfo = (videoInfo) => ({
  type: SET_VIDEO_INFO,
  payload: videoInfo,
});

export const setVideoFilename = (videoFilename) => ({
  type: SET_VIDEO_FILENAME,
  payload: videoFilename,
});

export const setFrameRate = (frameRate) => ({
  type: SET_FRAME_RATE,
  payload: frameRate,
});

export const setNumOfFramesToSkip = (num) => ({
  type: SET_NUM_OF_FRAMES_TO_SKIP,
  payload: num,
});

export const setCurrentFrame = (frame) => ({
  type: SET_CURRENT_FRAME,
  payload: frame,
});

export const setKeyframes = (frames) => ({
  type: SET_KEYFRAMES,
  payload: frames,
});

export const setKeyframeBool = (bool) => ({
  type: SET_KEYFRAME_BOOL,
  payload: bool,
});
