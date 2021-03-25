export const SELECT_VIDEOSET = 'SELECT_VIDEOSET';
export const SET_TITLE_TO_VIDEOSET = 'SET_TITLE_TO_VIDEOSET';
export const ADD_TO_VIDEOSETS = 'ADD_TO_VIDEOSETS';
export const REMOVE_FROM_VIDEOSETS = 'REMOVE_FROM_VIDEOSETS';
export const SET_DISPLAYS = 'SET_DISPLAYS';
export const SET_SAVED_DISPLAYS = 'SET_SAVED_DISPLAYS';

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
    type: SET_DISPLAYS,
  }
);

export const setSavedDisplays = (ip, saved) => (
  {
    ip,
    saved,
    type: SET_SAVED_DISPLAYS,
  }
);
