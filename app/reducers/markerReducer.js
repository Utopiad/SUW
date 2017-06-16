import {
  OPEN_EVENT,
  BACK_FROM_OPEN_EVENT
} from '../constants';

const initialState = {
  longitude: '',
  latitude: '',
  title: '',
  description: '',
  people: 0,
  eventtype: '',
  hashtag: '',
  id: '',
  id_user: ''
};

export const markerReducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_EVENT:
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude,
        title: action.title,
        description: action.description,
        people: action.people,
        eventtype: action.eventtype,
        hashtag: action.hashtag,
        id: action.id,
        id_user: action.id_user
      };
      break;
    case BACK_FROM_OPEN_EVENT:
      return {
        ...state,
        longitude: initialState.longitude,
        latitude: initialState.latitude,
        title: initialState.title,
        description: initialState.description,
        people: initialState.people,
        eventtype: initialState.eventtype,
        hashtag: initialState.hashtag,
        id: initialState.id,
        id_user: initialState.id_user
      };
      break;
    default:
      return state;
  }
}
