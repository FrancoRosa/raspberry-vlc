export const SET_VIDEOSETS = 'SET_VIDEOSETS';
export const ADD_TO_VIDEOSETS = 'ADD_TO_VIDEOSETS';
export const REMOVE_FROM_VIDEOSETS = 'REMOVE_FROM_VIDEOSETS';
export const SET_DISPLAYS = 'SET_DISPLAYS';

export const setVideoSets = sets => (
  {
    sets,
    type: SET_VIDEOSETS,
  }
);

export const addToVideoSets = item => (
  {
    item,
    type: ADD_TO_VIDEOSETS,
  }
);

export const removeFromVideoSets = item => (
  {
    item,
    type: REMOVE_FROM_VIDEOSETS,
  }
);

export const setDisplays = displays => (
  {
    displays,
    type: SET_DISPLAYS,
  }
);
