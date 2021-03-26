import {
  ADD_TO_VIDEOSETS,
  REMOVE_FROM_VIDEOSETS,
  SELECT_VIDEOSET,
  SET_TITLE_TO_VIDEOSET,
  SET_VIDEO_TO_VIDEOSET,
  SET_BLUR_TO_VIDEOSET,
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
        videos: ['','',''],
        blur: 0,
        selected: true
      },
    ];
    saveToLocalStorage(videosets);
    return videosets;
  }
}

const saveToLocalStorage = videosets => {
  localStorage.setItem("videosets", JSON.stringify(videosets))
}

const videosets = (state = getVideoSets(), action) => {
  let newState;
  switch (action.type) {
    
    case ADD_TO_VIDEOSETS:
      const videosets = state.map(videoset => ({...videoset, selected: false}))
      newState = [
        ...videosets, {
          id: Date.now(),
          setTitle: 'New video set',
          videos: ['','',''],
          blur: 0,
          selected: true
        }
      ];
      saveToLocalStorage(newState);
      return newState

    case REMOVE_FROM_VIDEOSETS:
      let sets = [...state]
      if (sets.length > 1) {
        let found = false
        sets.forEach(videoset => {
          if (!found && videoset.id != action.id) {
            videoset.selected = true
            found = true;
          }
        });
        newState = [
          ...sets.filter(videoset => videoset.id !== action.id),
        ];
        saveToLocalStorage(newState)
        return newState
      }
      return state

    case SELECT_VIDEOSET:
      newState = [
        ...state.map(videoset => ({
          ...videoset, selected: videoset.id == action.id ? true : false
        }))
      ]
      saveToLocalStorage(newState)
      return newState

    case SET_TITLE_TO_VIDEOSET:
      newState = [
        ...state.map(videoset => ({
          ...videoset, setTitle: videoset.id == action.id ? action.title : videoset.setTitle
        }))
      ]
      saveToLocalStorage(newState)
      return newState

    case SET_VIDEO_TO_VIDEOSET:
      const selectedVideoset = state.filter(videoset => videoset.selected == true)[0]
      selectedVideoset.videos[action.index]=action.video
      const videosetVideos = selectedVideoset.videos;

      newState = [
        ...state.map(videoset => ({
          ...videoset, videos: videoset.selected == true ? videosetVideos : videoset.videos
        }))
      ]
      saveToLocalStorage(newState)
      return newState

    case SET_BLUR_TO_VIDEOSET:
      const selVideoset = state.filter(videoset => videoset.selected == true)[0]
      selVideoset.blur=action.blur
      const videosetBlur = selVideoset.blur;

      newState = [
        ...state.map(videoset => ({
          ...videoset, blur: videoset.selected == true ? videosetBlur : videoset.blur
        }))
      ]
      saveToLocalStorage(newState)
      return newState
      
    default:
      return state;
  }
};

export default videosets;