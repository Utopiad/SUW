/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './app/store/configureStore';
import {setup} from './app/actions/__user'; //C'est top secret ce qu'on fait ici
import App from './app/index';

let store = configureStore();
store.dispatch(setup());

class SUW extends Component {
  render() {
    return(
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('SUW', () => SUW);
