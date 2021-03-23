import { SET_DISPLAYS } from '../actions';

const getDisplays = () => {
  let displays = localStorage.getItem("displays");
  if (displays) {
    return JSON.parse(displays)
  } else {
    displays = [
      {ip: '', enabled: false},
      {ip: '', enabled: false},
      {ip: '', enabled: false}
    ]
    localStorage.setItem("displays", JSON.stringify(displays))
    return displays
  }
}

const displays = (state = getDisplays(), action) => {
  switch (action.type) {
    case SET_DISPLAYS:
      return action.displays;
    default:
      return state;
  }
}

export default displays;