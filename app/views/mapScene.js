import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import {getPosition, connectToSocketServer} from '../actions/__user';
// import {  } from '../actions/sockets';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#611C35',
    alignItems: 'center'
  },
  heading: {
    fontSize: 24,
    color: '#2EC4B6',
    alignItems: 'center'
  },
  bottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 100,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'powderblue'
  },
  coords: {
    color: 'red',
    fontSize: 14
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: height,
    width: width
  }
});

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
    };
    this.map = null;
    this.counter = 0;
    // this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentWillMount() {
    this.watchId = this.props.getPosition();
  }

  componentDidUpdate() {
  }

  getCoordinates(e) {
    console.log(e.nativeEvent.coordinate);
  }

  componentWillUnMount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  // onRegionChange(){
  //   console.log('POSITION UPDATING');
  //   // console.log(this.props.position.longitude, this.props.position.latitude)
  //   const {longitude, latitude} = this.props.position;
  //
  //   this.setState({
  //     region: {
  //
  //     },
  //     updateMap: true
  //   });
  // }

  render() {
    const { longitude, latitude, accuracy } = this.props.position;
    const { region } = this.state;
    const { updatedPosition } = this.props;


     const customEdgePadding = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };
    const LatLng = [{
      latitude,
      longitude
    }];

    return(
      <View style={styles.container}>
        {updatedPosition &&
          <MapView
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
            ref={ map => {this.map = map}}
            // showsMyLocationButton={true}
            showsUserLocation={true}
            loadingEnabled={true}
            onPress={(e) => {this.getCoordinates(e)}}
            onLayout={() => this.map.fitToCoordinates(LatLng, {edgePadding: customEdgePadding, animated: false})}
            style={styles.map} >

          </MapView>
        }
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;

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
    updatedPosition
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosition: () => dispatch(getPosition())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapScene);

/* créer component bottomBar contenant boutons :
- placer event
- profil
- notofications

créer component top bar:
- input recherche d'un lieu
- icone recherche trigger action

*/
