import {
  SOCKET_CONNECTION_SUCCESS,
  SOCKET_CONNECTION_FAILURE,
  SOCKET_CONNECTION_LOST,
  SOCKET_NEW_PINS
} from '../constants';

import SocketIOClient from 'socket.io-client';

export const connectToSocketServer = () => {
  return (dispatch) => {
    launchConnection( (client) => {
      console.log(client);
      client.on('news', function(data){
        console.log('-------- SOCKET NEWS BEGIN');
        console.log(data);
        console.log('-------- SOCKET NEWS END');
      });
      dispatch({type: SOCKET_CONNECTION_SUCCESS, socketC: client});
    }, err => {
      dispatch({type: SOCKET_CONNECTION_FAILURE});
    });
  }
}

const launchConnection = (onSuccess, onError) => {
  try {
    // console.ignoredYellowBox = [
    //   'Setting a timer'
    // ];
    const socket = SocketIOClient('http://163.172.29.197:3000');
    onSuccess(socket);
  } catch(err) {
    onError(err);
  }

};
