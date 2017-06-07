import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';
// import {Router, Scene} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

import MapView from './views/mapView';
import CameraView from './views/cameraView';
import DeviceView from './views/deviceView';

export default class App extends Component {
  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={false}
        index={0} >
        <MapView />
        <CameraView />
        <DeviceView />
      </Swiper>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
// });
