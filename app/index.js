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

import {connect} from 'react-redux';

import { DELAY_HIDE_SPLASHSCREEN } from './constants';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(function() {
      SplashScreen.hide();
    }, DELAY_HIDE_SPLASHSCREEN);
  }

  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={false}
        index={0} >
        <MapScene />
        <CameraScene />
      </Swiper>
    );
  }
}

export default connect()(App);
