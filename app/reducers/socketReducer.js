import {
  SOCKET_CONNECTION_SUCCESS,
  SOCKET_CONNECTION_FAILURE,
  SOCKET_CONNECTION_LOST,
  SOCKET_NEW_PINS,
  GET_EVENTS_NEARBY_LOCATION
} from '../constants';
import _ from 'lodash';

export const socketReducer = ( state = {
  //Initial state
  isConnectedToSocket: false,
  socketC: null,
  error: null,
  events: {
    collection: [],
    last_update: ''
  }
}, action) => {
  switch(action.type) {
    case SOCKET_CONNECTION_SUCCESS:
      return Object.assign({}, state, {
        isConnectedToSocket: true,
        socketC: action.socketC
      });
      break;
    case SOCKET_CONNECTION_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });
      break;
    case GET_EVENTS_NEARBY_LOCATION:
      return {
        ...state,
        events: {
          collection: action.events,
          last_update: Date.now()
        }
      }
      break;
    default:
      return state;
  }
}


/*
- created_at: date
- last_update: date
- longitude: float
- latitude: float
- type: string
- name: string
- description : string
- size: number.int
- media : [strings]
*/
