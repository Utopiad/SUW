import {
  USER_PUSH_ID_SUCCESS,
  USER_SETUP,
  USER_SETUP_SUCCESS,
  USER_SETUP_FAILURE,
  SUCCESS_POSITION,
  FAILURE_POSITION,
  USER_PUSH_SUCCESS,
  USER_PUSH_FAILURE,

  SOCKET_CONNECTION_SUCCESS,
  SOCKET_CONNECTION_FAILURE,
} from '../constants';

export const userReducer = (state = {
  //InitialState
  isProfiling: false,
  error: null,
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
    is_tablet:    '',
    id:           '',
    created_at:   '',
    updated_at:   '',
  },
  isPositionning: false,
  updatedPosition: false,
  position: {
    longitude:    0,
    latitude:     0,
    accuracy:     0,
    altitude:     0,
    speed:        0,
    timestamp:    0
  },
  isConnectedToSocket: false,
  socketC: null,
  events: []

}, action) => {
  switch(action.type) {
    case USER_PUSH_ID_SUCCESS:
      return Object.assign({}, state, {
        isProfiling: false
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
          system:       action.profile.system,
          os_version:   action.profile.os_version,
          build_number: action.profile.build_number,
          local:        action.profile.local,
          country:      action.profile.country,
          timezone:     action.profile.timezone,
          is_tablet:    action.profile.is_tablet
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
        updatedPosition: true,
        position: {
          longitude: action.pos.longitude,
          latitude:  action.pos.latitude,
          accuracy:  action.pos.accuracy,
          altitude:  action.pos.altitude,
          speed:     action.pos.speed
        }
      });
    case FAILURE_POSITION:
      return Object.assign({}, state, {
        isSearching: true,
        updatedPosition: false,
      });
    case USER_PUSH_SUCCESS:
      return Object.assign({}, state, {
        isSearching: false,
        profile: {
          id: action.id,
          created_at: action.created_at,
          updated_at: action.updated_at
        }
      });
    case USER_PUSH_FAILURE:
      return Object.assign({}, state, {
        isSearching: false
      });

    case SOCKET_CONNECTION_SUCCESS:
    return Object.assign({}, state, {
      isConnectedToSocket: true,
      socketC: action.socketC
    });
    case SOCKET_CONNECTION_FAILURE:
    return Object.assign({}, state, {
      error: action.error
    });
    default:
      return state;
  }
}
