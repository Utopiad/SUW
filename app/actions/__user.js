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

  LOUIS_API,
} from '../constants';

import DeviceInfo from 'react-native-device-info';
import Axios from 'axios';
import SocketIOClient from 'socket.io-client';


const apiUrlouis = LOUIS_API + '/login';

// Position
function pushUserPosition(pos) {
  return {
    type: SUCCESS_POSITION,
    pos: pos
  };
  // return (dispatch) => {
  //   dispatch(socketPushPos(pos, id, client));
  //   return {
  //     type: SUCCESS_POSITION,
  //     pos: pos
  //   };
  // }
}

function didFail(err) {
  return {
    type: FAILURE_POSITION,
    isSearching: false
  }
}

const searchUserPosition = (success, onError) => {
  return (dispatch) => {
    const posOptions = {
      enableHighAccuracy: false,
      timeout: 5000,
      // maximumAge: 1000
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
      dispatch(searchUserPosition( position => {
        dispatch(pushAllToLouis(props, position));
      }, err => {
        console.warn(err);
      }));

    }, function(err) {
      dispatch({type: USER_SETUP_FAILURE, error: err});
    });

    // Initiate Watching change position
    // at the end of the setup
    // whenever position is got or not
    const posOptions = {
      enableHighAccuracy: false,
      timeout: 250,
      maximumAge: 1000,
      distanceFilter: 1
    };
    // const watchID = navigator.geolocation.watchPosition(
    //     (position) => {
    //       // console.log(position);
    //       dispatch( pushUserPosition(position.coords) );
    //       // success( position.coords );
    //     }, (error) => {
    //       dispatch( didFail(error) );
    //       // onError( error );
    //     },
    //     posOptions
    // );
  }
}

const getInfo = (onSuccess, onError) => {
  try {
    const devInfo = {
      uuid:         DeviceInfo.getUniqueID(),
      manufacturer: DeviceInfo.getManufacturer(),
      system:       DeviceInfo.getSystemName(),
      brand:        DeviceInfo.getBrand(),
      model:        DeviceInfo.getModel(),
      os_version:   DeviceInfo.getSystemVersion(),
      build_number: DeviceInfo.getBuildNumber(),
      local:        DeviceInfo.getDeviceLocale(),
      country:      DeviceInfo.getDeviceCountry(),
      timezone:     DeviceInfo.getTimezone(),
      is_tablet:    DeviceInfo.isTablet()
    }
    onSuccess(devInfo);
  } catch(err) {
    onError(err);
  }
}

const pushAllToLouis = (devInfo, position) => {
  return (dispatch) => {
    devInfo.latitude = position.latitude;
    devInfo.longitude = position.longitude;

    const data = JSON.stringify(devInfo);
    console.log(data);
    return fetch(apiUrlouis, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    .then((response) => {
      response.json().then( (responseJSON) => {
        console.log(responseJSON);
        dispatch({
          type: USER_PUSH_SUCCESS,
          id: responseJSON.result.id,
          created_at: responseJSON.result.createdAt,
          updated_at: responseJSON.result.updatedAt
        })
        dispatch(connectToSocketServer(position, responseJSON.result.id));
      });
    })
    .catch(error => {
      dispatch({type: USER_PUSH_FAILURE, error: error});
    });
  }
};

export const getPosition = () => {
  return (dispatch) => {
    const posOptions = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
      distanceFilter: 10
    };

    const watchID = navigator.geolocation.watchPosition(
        (position) => {
          dispatch( pushUserPosition(position.coords) );
          // success( position.coords );
        }, (error) => {
          dispatch( didFail(error) );
          // onError( error );
        },
        posOptions
    );

    return watchID;
  }
};

/*/
    SOCKETS PART
/*/

export const connectToSocketServer = (position, id) => {
  return (dispatch) => {
    launchConnection( (client) => {
      dispatch(socketPushPos(position, id, client));
      dispatch({type: SOCKET_CONNECTION_SUCCESS, socketC: client});
    }, err => {
      dispatch({type: SOCKET_CONNECTION_FAILURE, error: err});
    });
  }
};

const launchConnection = (onSuccess, onError) => {
  try {
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    const socket = SocketIOClient(LOUIS_API);
    // const socket = SocketIOClient('http://afec879e.ngrok.io');
    onSuccess(socket);
  } catch(err) {
    onError(err);
  }
};

export const socketPushRegionDragged = ({region}, id, client) => {
  return (dispatch) => {
    console.log(region);
    const {latitude, longitude} = region;
    console.log(latitude);
    const data = {
      limit: 5,
      location: [latitude, longitude],
      distance: 12,
      user_id: id
    };

    client.emit('user', data);
  }
}

export const socketPushPos = (position, id, client) => {
  return (dispatch) => {
    const data = {
      location: [position.longitude , position.latitude ], // [<longitude>, <latitude>]
      altitude: position.altitude,
      speed: position.speed,
      accuracy: position.accuracy,
      user_id: id
    };

    client.emit('user', data);
  }
};
