import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

import mapView from './views/mapView';
import cameraView from './views/cameraView';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">

          <Scene
            key="mapView"
            component={mapView}
            title="Home View"
            initial />
          <Scene
            key="cameraView"
            component={cameraView}
            title="Camera" />
        </Scene>
      </Router>
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
