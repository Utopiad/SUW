import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { socketReducer } from './socketReducer';
import { routesReducer } from './routesReducer';
import { eventReducer } from './eventReducer';

const rootReducer = combineReducers({
  routes: routesReducer,
  user: userReducer,
  newEvent: eventReducer
  socket: socketReducer
});

export default rootReducer;
