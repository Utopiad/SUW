import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Router, Scene, NavBar} from 'react-native-router-flux';
// import Swiper from 'react-native-swiper';
import SplashScreen from 'react-native-splash-screen';

import MapScene from './views/mapScene';
import CameraScene from './views/cameraScene';

import {connect} from 'react-redux';

import { DELAY_HIDE_SPLASHSCREEN } from './constants';

const RouterWithRedux = connect()(Router);

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(function() {
      SplashScreen.hide();
    }, DELAY_HIDE_SPLASHSCREEN);
  }

  // const reducerCreate = params => {
  //   const defaultReducer = Reducer(params);
  //   return (state, action)=>{
  //       console.log("ACTION:", action);
  //       return defaultReducer(state, action);
  //   }
  // };

  render() {

    return (
      <RouterWithRedux>
        <Scene key="root" hideNavBar={true}>
          <Scene key="map"
            component={MapScene}
            duration={0}
            initial
          />
          <Scene key="camera"
            component={CameraScene}
            duration={0}
          />
        </Scene>
      </RouterWithRedux>
    );
  }
}

export default connect()(App);
