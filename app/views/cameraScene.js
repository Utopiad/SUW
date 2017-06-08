import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2EC4B6',
    alignItems: 'center'
  },
  heading: {
    fontSize: 24,
    color: '#2E5077',
    alignItems: 'center'
  }
});

export default class CameraScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null
    };
  }

  // componentWillMount() {
  //   this.setState(state => ({
  //     ...state,
  //     isLoading: true
  //   }));
  // }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.heading}>CameraView !</Text>
      </View>
    )
  }
}
