import {
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  BEGIN_ADD_EVENT,
  SUBMIT_ADD_EVENT,
  OPEN_EVENT,
  BACK_FROM_OPEN_EVENT
} from '../constants';

export const beginAddEvent = (coords) => {
  return {
    type: BEGIN_ADD_EVENT,
    longitude: coords.longitude,
    latitude: coords.latitude,
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

export const openEvent = (marker) => {

  return {
    type: OPEN_EVENT,
    longitude: marker.location[1],
    latitude: marker.location[0],
    title: marker.name,
    description: marker.description,
    people: marker.nbr_participant,
    eventtype: marker.type,
    hashtag: marker.hashtag,
    id_user: marker.user_id,
    id: marker.id
  }
}

export const closeEvent = () => {
  return {
    type: BACK_FROM_OPEN_EVENT
  }
}
