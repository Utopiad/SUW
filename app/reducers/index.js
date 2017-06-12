import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { socketReducer } from './socketReducer';
import { routesReducer } from './routesReducer';

const rootReducer = combineReducers({
  routes: routesReducer,
  user: userReducer
  // socket: socketReducer
});

export default rootReducer;
