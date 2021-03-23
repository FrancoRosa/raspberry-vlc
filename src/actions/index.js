export const SET_VIDEOSETS = 'SET_VIDEOSETS';
export const ADD_TO_VIDEOSETS = 'ADD_TO_VIDEOSETS';
export const REMOVE_FROM_VIDEOSETS = 'REMOVE_FROM_VIDEOSETS';
export const DELETE_FROM_VIDEOSETS = 'DELETE_FROM_VIDEOSETS';
export const SET_DISPLAYS = 'SET_DISPLAYS';
export const SET_BLUR = 'SET_BLUR';

export const setVideoSet = sets => (
  {
    sets,
    type: SET_VIDEOSETS,
  }
);

export const addToVideoSet = item => (
  {
    item,
    type: ADD_TO_VIDEOSETS,
  }
);

export const removeFromVideoSet = item => (
  {
    item,
    type: REMOVE_FROM_VIDEOSETS,
  }
);

export const deleteFromVideoSet = item => (
  {
    item,
    type: DELETE_FROM_VIDEOSETS,
  }
);

export const setDisplays = displays => (
  {
    displays,
    type: SET_DISPLAYS,
  }
);
