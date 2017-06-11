import {
  SOCKET_CONNECTION_SUCCESS,
  SOCKET_CONNECTION_FAILURE,
  SOCKET_CONNECTION_LOST,
  SOCKET_NEW_PINS
} from '../constants';

export const socketReducer = ( state = {
  //Initial state
  isConnectedToSocket: false,
  socketC: null,
  error: null
}, action) => {
  switch(action.type) {
    case SOCKET_CONNECTION_SUCCESS:
    return Object.assign({}, state, {
      isConnectedToSocket: true,
      socketC: action.socketC
    });
    case SOCKET_CONNECTION_FAILURE:
    return Object.assign({}, state, {
      error: action.error
    });
    default:
      return state;
  }
}
