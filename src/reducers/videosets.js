import {
  ADD_TO_VIDEOSETS,
  REMOVE_FROM_VIDEOSETS,
  SET_VIDEOSETS,
} from '../actions/index';

const getVideoSets = () => {
  let videosets = localStorage.getItem("videosets");
  if (videosets) {
    return JSON.parse(videosets);
  } else {
    videosets = [];
    localStorage.setItem("videosets", videosets)
    return videosets;
  }
}

const videoset = (state = getVideoSets(), action) => {
  switch (action.type) {
    case ADD_TO_VIDEOSETS:
      return [
        ...state, {
          id: Date.now(),
          setTitle: 'New video set',
          v1: '',
          v1_uploaded: false,
          v2: '',
          v2_uploaded: false,
          v3: '',
          v3_uploaded: false,
          blur: 0,
          selected: false
        }
      ];
    case REMOVE_FROM_VIDEOSETS:
      return [
        ...state.filter(videoset => videoset.id !== action.videoset.id),
      ];
    case SET_VIDEOSETS:
      return action.videosets
    default:
      return state;
  }
};

export default videoset;