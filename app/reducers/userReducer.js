import {
  USER_PUSH_ID_SUCCESS,
  USER_SETUP,
  USER_SETUP_SUCCESS,
  USER_SETUP_FAILURE,
  SUCCESS_POSITION,
  FAILURE_POSITION,
  USER_PUSH_SUCCESS,
  USER_PUSH_FAILURE
} from '../constants';

export const userReducer = (state = {
  //InitialState
  isProfiling: false,
  error: false,
  dataFetched: false,
  profile: {
    uuid:         '',
    manufacturer: '',
    brand:        '',
    model:        '',
    system:       '',
    os_version:   '',
    build_number: '',
    local:        '',
    country:      '',
    timezone:     '',
    is_tablet:    ''
  },
  isSearching: false,
  position: {
    longitude:    0,
    latitude:     0,
    accuracy:     0,
    altitude:     0,
    speed:        0,
    timestamp:    0
  }
}, action) => {
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
          system:       action.profile.sytem,
          os_version:   action.profile.os_version,
          build_number: action.profile.build_number,
          local:        action.profile.local,
          country:      action.profile.country,
          timezone:     action.profile.timezone,
          is_tablet:    action.profile.is_tablet,
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
