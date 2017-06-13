import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

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

class CameraScene extends Component {
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
        <Text>Longitude: {this.props.newEvent.position.longitude}</Text>
        <Text>Latitude: {this.props.newEvent.position.latitude}</Text>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { user, routes, newEvent } = state;

  const {
    position,
    isConnectedToSocket,
    socketC,
    updatedPosition
  } = user;

  return {
    position,
    isConnectedToSocket,
    socketC,
    updatedPosition,
    routes,
    newEvent
  };
};

export default connect(mapStateToProps)(CameraScene);
