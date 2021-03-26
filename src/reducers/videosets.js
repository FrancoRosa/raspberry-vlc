import {
  ADD_TO_VIDEOSETS,
  REMOVE_FROM_VIDEOSETS,
  SELECT_VIDEOSET,
  SET_TITLE_TO_VIDEOSET,
  SET_VIDEO_TO_VIDEOSET,
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
    localStorage.setItem("videosets", JSON.stringify(videosets))
    return videosets;
  }
}

const videosets = (state = getVideoSets(), action) => {
  switch (action.type) {
    case ADD_TO_VIDEOSETS:
      const videosets = state.map(videoset => ({...videoset, selected: false}))
      return [
        ...videosets, {
          id: Date.now(),
          setTitle: 'New video set',
          videos: ['','',''],
          blur: 0,
          selected: true
        }
      ];

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
        return [
          ...sets.filter(videoset => videoset.id !== action.id),
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

    case SET_VIDEO_TO_VIDEOSET:
      const selectedVideoset = state.filter(videoset => videoset.selected == true)[0]
      selectedVideoset.videos[action.index]=action.video
      const videosetVideos = selectedVideoset.videos;

      return [
        ...state.map(videoset => ({
          ...videoset, videos: videoset.selected == true ? videosetVideos : videoset.videos
        }))
      ]

    default:
      return state;
  }
};

export default videosets;