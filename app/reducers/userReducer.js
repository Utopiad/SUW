import {
  USER_PUSH_ID_SUCCESS,
  USER_SETUP,
  USER_SETUP_SUCCESS,
  USER_SETUP_FAILURE,
  SUCCESS_POSITION,
  FAILURE_POSITION,
  USER_PUSH_SUCCESS,
  USER_PUSH_FAILURE,
  INITIAL_STATE
} from '../constants';

export const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case USER_PUSH_ID_SUCCESS:
      return Object.assign({}, state, {
        isProfiling: false,
      });
    case USER_SETUP:
      return Object.assign({}, state, {
        isProfiling: true,
        dataFetched: false
      });
    case USER_SETUP_SUCCESS:
      return Object.assign({}, state, {
        isProfiling: false,
        dataFetched: true,
        profile: {
          uuid:         action.profile.uuid,
          manufacturer: action.profile.manufacturer,
          brand:        action.profile.brand,
          model:        action.profile.model,
          os:           action.profile.os,
          osVersion:    action.profile.osVersion,
          buildNumber:  action.profile.buildNumber,
          localLang:    action.profile.localLang,
          country:      action.profile.country,
          timeZone:     action.profile.timeZone,
          isTablet:     action.profile.isTablet,
        },
        error: false
      });
    case USER_SETUP_FAILURE:
      return Object.assign({}, state, {
        isProfiling: false,
        dataFetched: false,
        error: action.error
      });
    case SUCCESS_POSITION:
      return Object.assign({}, state, {
        isSearching: false,
        position: {
          longitude: action.pos.longitude,
          latitude:  action.pos.latitude,
          accuracy:  action.pos.accuracy,
          altitude:  action.pos.altitude,
          speed:     action.pos.speed,
        }
      });
    case FAILURE_POSITION:
      return Object.assign({}, state, {
        isSearching: true
      });
    case USER_PUSH_SUCCESS:
      return Object.assign({}, state, {
        isSearching: false
      });
    case USER_PUSH_FAILURE:
      return Object.assign({}, state, {
        isSearching: false
      });
    default:
      return state;
  }
}
