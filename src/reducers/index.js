import { combineReducers, createStore } from 'redux';
import displays from './displays';
import videosets from './videosets';

const rootReducer = combineReducers({
  displays,
  videosets,
});

const store = createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;