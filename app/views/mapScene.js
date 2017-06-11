import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {getPosition} from '../actions/__user';
import { connectToSocketServer } from '../actions/sockets';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#611C35',
    alignItems: 'center'
  },
  heading: {
    fontSize: 24,
    color: '#2EC4B6',
    alignItems: 'center'
  },
  coords: {
    color: 'white'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

class MapScene extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.log(this.props);

    if (this.props.isConnectedToSocket) {
      const {socketC} = this.props;

      // socketC.emit('news', 'J\'aime me beurrer la biscotte.');
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const updatedLatitude   =   nextProps.position.latitude !== this.props.position.latitude;
    const updatedLongitude  =  nextProps.position.longitude !== this.props.position.longitude;
    const updatedAccuracy   =   nextProps.position.accuracy !== this.props.position.accuracy;

      if ( updatedLatitude || updatedLongitude || updatedAccuracy ) {
        // console.log('Position changed !');
        return true;
      }
    return false;
  }

  componentDidUpdate() {

  }

  render() {
    // const {position} = this.state;
    // const {longitude, latitude} = position.coords;
    // console.log(position.coords);
    return(
      <View style={styles.container}>
        <MapView
          region={{
            longitude: this.props.position.longitude,
            latitude: this.props.position.latitude,
            accuracy: this.props.position.accuracy,
            latitudeDelta: 0.09214,
            longitudeDelta: 0.00721,
          }}
          style={styles.map} />
        <Text style={styles.coords}>Longitude: {this.props.position.longitude}</Text>
        <Text style={styles.coords}>Latitude: {this.props.position.latitude}</Text>
        <Text style={styles.coords}>accuracy: {this.props.position.accuracy}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { user, socket } = state;

  const {
    position
  } = user;

  const {
    isConnectedToSocket,
    socketC
  } = socket;

  return {
    position,
    isConnectedToSocket,
    socketC
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosition: () => dispatch(getPosition()),
    connectToSocket: () => dispatch(connectToSocketServer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScene);
