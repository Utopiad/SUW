import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import {getPosition, connectToSocketServer} from '../actions/__user';
// import {  } from '../actions/sockets';
import {connect} from 'react-redux';
import MapView from 'react-native-maps';
import {Actions} from 'react-native-router-flux';

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
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class MapScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {},
      markers: []
    };
    this.map = null;
    this.counter = 0;
    this.onRegionChange = this.onRegionChange.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  componentWillMount() {
    this.watchId = this.props.getPosition();
  }

  componentDidMount() {
    console.log('LONGITUDE_DELTA', LONGITUDE_DELTA);
    console.log('LATITUDE_DELTA', LATITUDE_DELTA);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const {updatedPosition} = this.props;
  //   if(updatedPosition) {
  //     return true;
  //   }
  //   return false;
  // }
  componentDidUpdate() {
  }

  getCoordinates(e) {
    console.log(e.nativeEvent.coordinate);
    const markPosition = e.nativeEvent.coordinate;

    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: markPosition,
          key: id++,
          color: randomColor()
        },
      ],
    });
  }

  componentWillUnMount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  onRegionChange(region){
    console.log('POSITION UPDATING');
    console.log(region);
    // console.log(this.props.position.longitude, this.props.position.latitude)
    const {longitude, latitude} = this.props.position;

    // this.setState({region});
  }

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

            onPress={ (e) => {this.getCoordinates(e)}}
            onLayout={() => this.map.fitToCoordinates(LatLng, {edgePadding: customEdgePadding, animated: false})}
            onRegionChangeComplete={this.onRegionChange}
            style={styles.map} >

            {this.state.markers.map(marker => {
              return <MapView.Marker
                key={marker.key}
                coordinate={marker.coordinate}
                pinColor={marker.color}
              />
            })}
          </MapView>
        }
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  const { routes } = state;

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
    routes
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
