import {
  ADD_TO_VIDEOSETS,
  REMOVE_FROM_VIDEOSETS,
  SELECT_VIDEOSET,
  SET_TITLE_TO_VIDEOSET,
} from '../actions/index';

const getVideoSets = () => {
  let videosets = localStorage.getItem("videosets");
  if (videosets) {
    return JSON.parse(videosets);
  } else {
    videosets = [
      {
        id: Date.now(),
        setTitle: 'New video set',
        v1: '',
        v1_uploaded: false,
        v2: '',
        v2_uploaded: false,
        v3: '',
        v3_uploaded: false,
        blur: 0,
        selected: true
      },
    ];
    localStorage.setItem("videosets", JSON.stringify(videosets))
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
      if (state.length > 1) {
        return [
          ...state.filter(videoset => videoset.id !== action.id),
        ];
      }
      return state
    case SELECT_VIDEOSET:
      return [
        ...state.map(videoset => ({
          ...videoset, selected: videoset.id == action.id ? true : false
        }))
      ]
    case SET_TITLE_TO_VIDEOSET:
      return [
        ...state.map(videoset => ({
          ...videoset, setTitle: videoset.id == action.id ? action.title : videoset.setTitle
        }))
      ]
    default:
      return state;
  }
};

export default videoset;