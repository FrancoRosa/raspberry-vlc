import { SET_DISPLAYS_IPS } from '../actions';
import { SET_SAVED_DISPLAYS } from '../actions';
import { SET_STATUS_TO_DISPLAYS } from '../actions';

const getDisplaysIPs = () => {
  let displays = [
    { ip: '', enabled: false, saved: [] },
    { ip: '', enabled: false, saved: [] },
    { ip: '', enabled: false, saved: [] }
  ]
  let displaysIPs = localStorage.getItem("displays");
  if (displaysIPs) {
    displaysIPs = JSON.parse(displaysIPs)
    return displays.map(display => ({...display, ip: displaysIPs[displays.indexOf(display)].ip}))
  } else {
    localStorage.setItem("displays", JSON.stringify(displays.map(display => ({ip: display.ip}))))
    return displays
  }
}

const saveToLocalStorage = displays => {
  localStorage.setItem("displays", JSON.stringify(displays.map(display=>({ip: display.ip}))))
}

const displays = (state = getDisplaysIPs(), action) => {
  switch (action.type) {
    case SET_DISPLAYS_IPS:
      saveToLocalStorage(action.displays)
      return action.displays;
    
    case SET_SAVED_DISPLAYS:
      let displays = [...state]
      return displays.map(display => ({
        ...display, saved: display.ip === action.ip ? action.saved : display.saved
      }))
    
    case SET_STATUS_TO_DISPLAYS:
      let displayss = [...state]
      return displayss.map(display => ({
        ...display, enabled: display.ip === action.ip ? action.status : display.enabled
      }))

    default:
      return state;
  }
}

export default displays;