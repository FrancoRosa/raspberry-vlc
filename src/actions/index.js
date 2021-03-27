export const SELECT_VIDEOSET = 'SELECT_VIDEOSET';
export const SET_TITLE_TO_VIDEOSET = 'SET_TITLE_TO_VIDEOSET';
export const SET_VIDEO_TO_VIDEOSET = 'SET_VIDEO_TO_VIDEOSET';
export const SET_BLUR_TO_VIDEOSET = 'SET_BLUR_TO_VIDEOSET';
export const ADD_TO_VIDEOSETS = 'ADD_TO_VIDEOSETS';
export const REMOVE_FROM_VIDEOSETS = 'REMOVE_FROM_VIDEOSETS';
export const SET_DISPLAYS_IPS = 'SET_DISPLAYS_IPS';
export const SET_SAVED_DISPLAYS = 'SET_SAVED_DISPLAYS';
export const SET_STATUS_TO_DISPLAYS = 'SET_STATUS_TO_DISPLAYS';

export const selectVideoSet = id => (
  {
    id,
    type: SELECT_VIDEOSET,
  }
);

export const setTitleToVideoSet = (id, title) => (
  {
    id,
    title,
    type: SET_TITLE_TO_VIDEOSET,
  }
);

export const setVideoToVideoSet = (index, video) => (
  {
    index,
    video,
    type: SET_VIDEO_TO_VIDEOSET,
  }
);

export const setBlurToVideoSet = (blur) => (
  {
    blur,
    type: SET_BLUR_TO_VIDEOSET,
  }
);


export const addToVideoSets = () => (
  {
    type: ADD_TO_VIDEOSETS,
  }
);

export const removeFromVideoSets = id => (
  {
    id,
    type: REMOVE_FROM_VIDEOSETS,
  }
);

export const setDisplays = displays => (
  {
    displays,
    type: SET_DISPLAYS_IPS,
  }
);

export const setSavedDisplays = (ip, saved) => (
  {
    ip,
    saved,
    type: SET_SAVED_DISPLAYS,
  }
);

export const setStatusToDisplays = (ip, status) => (
  {
    ip,
    status,
    type: SET_STATUS_TO_DISPLAYS,
  }
);