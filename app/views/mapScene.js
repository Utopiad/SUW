import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {getPosition} from '../actions/__user';
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

  // componentDidMount() {
  //   console.log(this.props);
  //   const getPosOptions = {
  //     enableHighAccuracy: false,
  //     timeout: 5000,
  //     maximumAge: 1000
  //   };
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.position.latitude !== this.props.position.latitude ||
  //     nextProps.position.longitude !== this.props.position.longitude ||
  //     nextProps.position.accuracy !== this.props.position.accuracy) {
  //       // console.log('Position changed !');
  //       return true;
  //     }
  //   return false;
  // }

  componentDidUpdate() {
    return(
      <MapView
        region={{
          longitude: this.props.position.longitude,
          latitude: this.props.position.latitude,
          accuracy: this.props.position.accuracy,
          latitudeDelta: 0.09214,
          longitudeDelta: 0.00721,
        }}
        style={styles.map} />
    );
  }

  render() {
    // const {position} = this.state;
    // const {longitude, latitude} = position.coords;
    // console.log(position.coords);
    return(
      <View style={styles.container}>
        <Text style={styles.coords}>Longitude: {this.props.position.longitude}</Text>
        <Text style={styles.coords}>Latitude: {this.props.position.latitude}</Text>
        <Text style={styles.coords}>accuracy: {this.props.position.accuracy}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {user} = state;
  const {
    position
  } = user;

  return {
    position
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosition: () => dispatch(getPosition())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScene);
