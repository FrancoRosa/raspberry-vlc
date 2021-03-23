export const SELECT_VIDEOSET = 'SELECT_VIDEOSET';
export const ADD_TO_VIDEOSETS = 'ADD_TO_VIDEOSETS';
export const REMOVE_FROM_VIDEOSETS = 'REMOVE_FROM_VIDEOSETS';
export const SET_DISPLAYS = 'SET_DISPLAYS';

export const selectVideoSet = id => (
  {
    id,
    type: SELECT_VIDEOSET,
  }
);

export const addToVideoSets = () => (
  {
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
