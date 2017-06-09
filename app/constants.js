// export const USER_PUSH_ID_SUCCESS = 'USER_PUSH_ID_SUCCESS';

export const USER_SETUP = 'USER_SETUP';
export const USER_SETUP_SUCCESS = 'USER_SETUP_SUCCESS';
export const USER_SETUP_FAILURE = 'USER_SETUP_FAILURE';

export const SUCCESS_POSITION = 'SUCCESS_POSITION';
export const FAILURE_POSITION = 'FAILURE_POSITION';

export const USER_PUSH_SUCCESS = 'USER_PUSH_SUCCESS';
export const USER_PUSH_FAILURE = 'USER_PUSH_FAILURE';

export const INITIAL_STATE = {
  //InitialState
  isProfiling: false,
  error: false,
  dataFetched: false,
  profile: {
    uuid:         '',
    manufacturer: '',
    brand:        '',
    model:        '',
    os:           '',
    osVersion:    '',
    buildNumber:  '',
    localLang:    '',
    country:      '',
    timeZone:     '',
    isTablet:     ''
  },
  isSearching: false,
  position: {
    longitude: 0,
    latitude: 0,
    accuracy: 0,
    altitude: 0,
    speed: 0,
    timestamp: 0
  }
}
