import {
  SOCKET_CONNECTION_SUCCESS,
  SOCKET_CONNECTION_FAILURE,
  SOCKET_CONNECTION_LOST,
  SOCKET_NEW_PINS,
  GET_EVENTS_NEARBY_LOCATION
} from '../constants';

export const socketReducer = ( state = {
  //Initial state
  isConnectedToSocket: false,
  socketC: null,
  error: null,
  events: {
    collection: [{
      name: '',
      type: '',
      description: '',
      numberOfPeople: 0,
      upvotes: 0,
      downvotes: 0,
      location: {
        latitude: 48.86593862195033,
        longitude: 2.4298185110092163
      }
    }],
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
      return Object.assign({}, state, {
        events: {
          collection: [
            ...collection,
            {
              name: action.events.name,
              type: action.events.type,
              description: action.events.description,
              numberOfPeople: action.events.numberOfPeople,
              upvotes: action.events.upvotes,
              downvotes: action.events.downvotes,
              location: {
                latitude: action.events.latitude,
                longitude: action.events.longitude
              }
            }
          ],
          last_update: Date.now()
        }
      });
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
