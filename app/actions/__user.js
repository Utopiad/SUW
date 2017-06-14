import {
  USER_PUSH_ID_SUCCESS,
  USER_SETUP,
  USER_SETUP_SUCCESS,
  USER_SETUP_FAILURE,
  SUCCESS_POSITION,
  FAILURE_POSITION,

  USER_PUSH_SUCCESS,
  USER_PUSH_FAILURE,

  LOUIS_API,
} from '../constants';

import DeviceInfo from 'react-native-device-info';
import { AsyncStorage } from 'react-native';
import {
  connectToSocketServer,
  socketPushPos
} from './sockets';


const apiUrlouis = LOUIS_API + '/login';


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
    isNewUser.then(() => {
      console.log('THIS USER IS ALREADY SETUP');
      dispatch(searchUserPosition( position => {
        dispatch(connectToSocketServer({}, position));
      }, err => {
        console.warn(err);
      }));
      return;
    }).catch( () => {
      console.log('THIS IS A NEW USER !');
      dispatch({type: USER_SETUP});

      getInfo(function(props) {
        dispatch({type: USER_SETUP_SUCCESS, profile: props});
        dispatch(searchUserPosition( position => {
          dispatch(connectToSocketServer(props, position));
        }, err => {
          console.warn(err);
        }));

      }, function(err) {
        dispatch({type: USER_SETUP_FAILURE, error: err});
      });
    });
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

export const isNewUser =
  new Promise( async function isNewUser(resolve, reject) {
    const id = await AsyncStorage.getItem('user_id');
    if (typeof id === 'string') {
      resolve();
    } else {
      resolve();
    }
  })

export const user_id =
  new Promise( async function user_id(resolve, reject) {
    const id = await AsyncStorage.getItem('user_id');
    if (typeof id === 'string') {
      resolve(JSON(parse(id)));
    } else {
      let reason = new Error('Error during recuperation of UserId in AsyncStorage.');
      resolve();
    }
    // await AsyncStorage.getItem('user_id').then((response) => {
    //   // console.log('Good ID !!! => '+response);
    //   if(response){
    //     resolve(JSON.parse(response));
    //   } else {
    //
    //   }
    // });
  }
);


export const pushAllToLouis = (devInfo, position, client) => {
  return (dispatch) => {
    devInfo.latitude = position.latitude;
    devInfo.longitude = position.longitude;

    const data = JSON.stringify(devInfo);

    return fetch(apiUrlouis, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    .then((response) => {
      response.json().then( (responseJSON) => {
        dispatch({
          type: USER_PUSH_SUCCESS,
          id: responseJSON.result.id,
          created_at: responseJSON.result.createdAt,
          updated_at: responseJSON.result.updatedAt
        });
        try {
          AsyncStorage.setItem('user_id', JSON.stringify(responseJSON.result.id));
        } catch(err) {
          console.warn(err);
        }
      });
    }).catch(error => {
      dispatch({type: USER_PUSH_FAILURE, error: error});
      throw error;
    });
  }
};

export const getPosition = (id, client) => {
  return (dispatch) => {
    const posOptions = {
      enableHighAccuracy: false,
      timeout: 2500,
      maximumAge: 0,
      distanceFilter: 10
    };
    const watchID = navigator.geolocation.watchPosition(
        (position) => {
          console.log(position);
          dispatch(socketPushPos(position.coords, id, client));
          dispatch( pushUserPosition(position.coords));
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