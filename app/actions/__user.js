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

import DeviceInfo from 'react-native-device-info';
import Axios from 'axios';

const apiUrlouis = "http://163.172.29.197:3000/login";

// Position
function pushUserPosition(pos) {
  return {
    type: SUCCESS_POSITION,
    pos: pos
  };
}

function didFail(err) {
  return {
    type: FAILURE_POSITION,
    isSearching: false,
  }
}

const searchUserPosition = (success, onError) => {
  return (dispatch) => {
    const posOptions = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 1000
    };

    navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position);
          dispatch( pushUserPosition(position.coords) );
          success( position.coords );
        }, (error) => {
          dispatch( didFail(error) );
          onError( error );
        },
        posOptions
    );
  }
}

// UserID
function pushUserId(devInfo) {
  return {
    type: USER_PUSH_ID_SUCCESS,
    profile: devInfo
  };
}

const success = (props) => {
  dispatch({type: USER_SETUP_SUCCESS, profile: props});
};

const error = (err) => {
  dispatch({type: USER_SETUP_FAILURE, error: err});
}

export function setup() {
  return (dispatch) => {
    dispatch({type: USER_SETUP});
    getInfo(function(props) {
      dispatch({type: USER_SETUP_SUCCESS, profile: props});

      dispatch(searchUserPosition( function(position) {
        dispatch(pushAllToLouis(props, position));
      }, function(err) {
        console.warn(err);
      })).bind(dispatch);

    }, function(err) {
      dispatch({type: USER_SETUP_FAILURE, error: err});
    });

  }
}

const getInfo = (onSuccess, onError) => {
  try {
    const devInfo = {
      uuid:         DeviceInfo.getUniqueID(),
      manufacturer: DeviceInfo.getManufacturer(),
      brand:        DeviceInfo.getBrand(),
      model:        DeviceInfo.getModel(),
      os:           DeviceInfo.getSystemName(),
      osVersion:    DeviceInfo.getSystemVersion(),
      buildNumber:  DeviceInfo.getBuildNumber(),
      localLang:    DeviceInfo.getDeviceLocale(),
      country:      DeviceInfo.getDeviceCountry(),
      timeZone:     DeviceInfo.getTimezone(),
      isTablet:     DeviceInfo.isTablet() || false
    }

    onSuccess(devInfo);
  } catch(err) {
    onError(err);
  }
}

const pushAllToLouis = (devInfo, position) => {
  return (dispatch) => {
    return Axios.post(apiUrlouis, {devInfo, position})
      .then(() => {
        dispatch({type: USER_PUSH_SUCCESS});
      }).catch(error => {
        dispatch({type: USER_PUSH_FAILURE});
      })
  }
}


function pushUserInfos(props) {
  return (dispatch) => {
    console.log('hello');



    dispatch(pushUserId(props));

    // debugger;
    // return Axios.post(apiUrlouis)
  }
}
