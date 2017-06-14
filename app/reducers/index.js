import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { socketReducer } from './socketReducer';

const rootReducer = combineReducers({
  user: userReducer,
  socket: socketReducer
});

export default rootReducer;
