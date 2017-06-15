import {
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  BEGIN_ADD_EVENT,
  SUBMIT_ADD_EVENT
} from '../constants';

const initialState = {
  longitude: '',
  latitude: '',
  title: '',
  description: '',
  people: 0,
  eventtype: '',
  hashtag: ''
}

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_ADD_EVENT:
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude
      };
      break;
    case SUBMIT_ADD_EVENT:
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude,
        title: action.title,
        description: action.description,
        people: action.people,
        eventtype: action.eventtype,
        hashtag: action.hashtag
      };
      break;
    case ADD_EVENT_SUCCESS:
      return {

      };
      break;
    default:
      return state;
  }
}
