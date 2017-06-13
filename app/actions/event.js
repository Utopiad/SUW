import {
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  BEGIN_ADD_EVENT
} from '../constants';

export const beginAddEvent = (coords) => {
  return {
    type: BEGIN_ADD_EVENT,
    position: coords
  };
}
