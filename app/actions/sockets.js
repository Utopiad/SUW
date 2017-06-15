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

      if(Object.keys(profile).length > 0) {
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

    const dataForEvents = {
      latitude: latitude,
      longitude: longitude,
      distance: 1000
    };

    client.emit('fetch_events', dataForEvents, (data) => {
      dispatch(getEvents(data));
      // console.log(data);
    });
  }
};

export const socketPushPos = (position, id, client) => {
  return (dispatch) => {
    console.log('PUSHING POS WITH SOCKETS !!');

    const data = {
      location: [position.latitude , position.longitude], // [<latitude>, <longitude>]
      altitude: position.altitude,
      speed: position.speed,
      accuracy: position.accuracy,
      user_id: id,
      distance: 500
    };

    client.emit('user', data, (response) => {
      console.log('---response Event for User psition', response);
      console.log(typeof response);
      dispatch(getEvents(response));
    });
  }
};

//event, id, client
export const submitEvent = (event, client) => {
  return (dispatch) => {
    console.log('SUBMITTING EVENT');

    const dataEvent = {
      user_id: event.user_id,
      nbr_participant: event.people,
      name: event.title,
      type: event.eventtype,
      description: event.description,
      hashtag: event.hashtag,
      longitude: event.longitude,
      latitude: event.latitude,
    };

    client.emit('add_event', dataEvent, (response) => {
      console.log(response);
    });
  }
};

export const voteEvent = (event, client) => {
  return (dispatch) => {
    const data = {
      id_user: event.id_user,
      id_event: event.id_event,
      type: event.type,
      nbr_participants: event.nbr_participant
    };
    console.log(data);
    client.emit('vote_event', data, (response) => {
      console.log(response);
    });
  }
}

const getEvents = (data) => {
  return {
    type: GET_EVENTS_NEARBY_LOCATION,
    events: data
  };
};
