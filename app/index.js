import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';
// import {Router, Scene} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import SplashScreen from 'react-native-splash-screen';

import MapScene from './views/mapScene';
import CameraScene from './views/cameraScene';
import DeviceView from './views/deviceView';

import {connect} from 'react-redux';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={false}
        index={0} >
        <MapScene />
        <CameraScene />
        <DeviceView />
      </Swiper>
    );
  }
}

export default connect()(App);
