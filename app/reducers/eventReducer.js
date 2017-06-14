import {
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  BEGIN_ADD_EVENT
} from '../constants';

const initialState = null

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_ADD_EVENT:
      return {
        position: action.position
      };
      break;
    case ADD_EVENT_FAILURE:
      return {
        ...state,
        error: action.error
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
