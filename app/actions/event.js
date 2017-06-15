import {
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  BEGIN_ADD_EVENT,
  SUBMIT_ADD_EVENT
} from '../constants';

export const beginAddEvent = (coords) => {
  return {
    type: BEGIN_ADD_EVENT,
    longitude: coords.longitude,
    latitude: coords.latitude
  };
}

export const submitAddEvent = (value) => {
  return {
    type: SUBMIT_ADD_EVENT,
    longitude: value.longitude,
    latitude: value.latitude,
    title: value.title,
    description: value.description,
    people: value.people,
    eventtype: value.eventtype,
    hashtag: value.hashtag
  };
}

export const successAddEvent = () => {
  return {
    type: ADD_EVENT_SUCCESS
  }
}
