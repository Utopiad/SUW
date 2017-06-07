import React, {Component} from 'react';
import {
  Stylesheet,
  View,
  Text
} from 'react-native';

export default class cameraView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null
    };
  }

  render() {
    return(
      <View>
        <Text>cameraView !</Text>
      </View>
    )
  }
}
