import {
  SOCKET_CONNECTION_SUCCESS,
  SOCKET_CONNECTION_FAILURE,
  SOCKET_CONNECTION_LOST,
  SOCKET_NEW_PINS,
  GET_EVENTS_NEARBY_LOCATION,
  LOUIS_API
} from '../constants';

import {pushAllToLouis} from './__user';
import SocketIOClient from 'socket.io-client';

export const connectToSocketServer = (profile, position) => {
  return (dispatch) => {
    launchConnection( (client) => {
      if(profile.length !== -1) {
        dispatch(pushAllToLouis(profile, position, client));
      }
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
    onSuccess(socket);
  } catch(err) {
    onError(err);
  }
};

export const socketPushRegionDragged = ({region}, id, client) => {
  return (dispatch) => {
    const {latitude, longitude} = region;
    const data = {
      location: [latitude, longitude],
      user_id: id
    };

    // client.emit('fetch_events', data);

    // client.on('fetch_events', (events) => {
    //   console.log(events);
    // });
  }
}

export const socketPushPos = (position, id, client) => {
  return (dispatch) => {
    console.log('PUSHING POS WITH SOCKETS !!');

    const data = {
      location: [position.latitude , position.longitude], // [<latitude>, <longitude>]
      altitude: position.altitude,
      speed: position.speed,
      accuracy: position.accuracy,
      user_id: id
    };

    client.emit('user', data);

    client.on('user', (response) => {
      console.log(response);
      //vérifier qu'il y a de nouveaux events depuis la derniere demande,
      // si oui, on prend tout et on dispatch une action
      //sinon on ne retourne rien
    });

    // dispatch(getEvents(response));
  }
};

const getEvents = (data) => {
  return {
    type: GET_EVENTS_NEARBY_LOCATION,
    events: data
  };
};
