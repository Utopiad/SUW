import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { socketReducer } from './socketReducer';
import { routesReducer } from './routesReducer';
import { eventReducer } from './eventReducer';
import { markerReducer } from './markerReducer';

const rootReducer = combineReducers({
  routes: routesReducer,
  user: userReducer,
  newEvent: eventReducer,
  socket: socketReducer,
  marker: markerReducer
});

export default rootReducer;
