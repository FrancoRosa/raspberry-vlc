import { SET_DISPLAYS } from '../actions';
import { SET_SAVED_DISPLAYS } from '../actions';

const getDisplays = () => {
  let displays = localStorage.getItem("displays");
  if (displays) {
    return JSON.parse(displays)
  } else {
    displays = [
      { ip: '', enabled: false, saved: [] },
      { ip: '', enabled: false, saved: [] },
      { ip: '', enabled: false, saved: [] }
    ]
    localStorage.setItem("displays", JSON.stringify(displays))
    return displays
  }
}

const saveToLocalStorage = displays => {
  localStorage.setItem("displays", JSON.stringify(displays))
}

const displays = (state = getDisplays(), action) => {
  switch (action.type) {
    case SET_DISPLAYS:
      saveToLocalStorage(action.displays)
      return action.displays;
    case SET_SAVED_DISPLAYS:
      let displays = [...state]
      return displays.map(display => ({
        ...display, saved: display.ip == action.ip ? action.saved : display.saved
      }))
    default:
      return state;
  }
}

export default displays;