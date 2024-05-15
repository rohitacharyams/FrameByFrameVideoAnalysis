import { atom } from "recoil";

const isLoggedInAtom = atom({
  key: "isLoggedIn",
  default: false,
});

const videoInfoAtom = atom({
  key: "videoInfo",
  default: {
    videoUrl: "",
  },
});

const frameRateAtom = atom({
  key: "frameRate",
  default: 1,
});

const numOfFramesToSkipAtom = atom({
  key: "numOfFramesToSkip",
  default: 1,
});

const currentFrameAtom = atom({
  key: "currentFrame",
  default: 1,
});

const keyframesAtom = atom({
  key: "keyframes",
  default: [],
});

const keyframeBoolAtom = atom({
  key: "keyframeBool",
  default: {
    keyFrameInActive: false,
    keyFrameOutActive: true,
  },
});

const videoFilenameAtom = atom({
  key: "videoFilename",
  default: "",
});

const thumbnailUrlAtom = atom({
  key: "thumbnailUrl",
  default: "",
});

const stepFramesAtom = atom({
  key: "stepFrames",
  default: { startFrame: 1, endFrame: 1 },
});

const videoStateAtom = atom({
  key: "videoState",
  default: { currentState: true, frame: 3 },
});

const updateDisplayedStepAtom = atom({
  key: "updateDisplayedStep",
  default: { frameNumber: 1 },
});

const danceStepsAtom = atom({
  key: "danceSteps",
  default: [],
});

export {
  isLoggedInAtom,
  videoInfoAtom,
  frameRateAtom,
  numOfFramesToSkipAtom,
  currentFrameAtom,
  keyframesAtom,
  keyframeBoolAtom,
  videoFilenameAtom,
  thumbnailUrlAtom,
  stepFramesAtom,
  videoStateAtom,
  updateDisplayedStepAtom,
  danceStepsAtom,
};
