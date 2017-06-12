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
      updateMap: false
    };
    this.counter = 0;
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  // getInitialState() {
  //   return {
  //     region: {
  //       latitude: 37.78825,
  //       longitude: -122.4324,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     }
  //   }
  // }

  componentWillMount() {
    this.watchId = this.props.getPosition();
  }

  componentDidMount() {
    const { longitude, latitude } = this.props.position;
    this.setState({
      region: {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    updateMap: true
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const updatedLatitude   =   nextProps.position.latitude !== this.props.position.latitude;
    const updatedLongitude  =   nextProps.position.longitude !== this.props.position.longitude;
    const updatedAccuracy   =   nextProps.position.accuracy !== this.props.position.accuracy;

    // const { updatedPosition } = nextProps;

    if ( nextState.updateMap || updatedAccuracy || updatedLongitude || updatedLatitude ) {
      // console.log('Position changed !');

      return true;
    }
    return false;
  }

  componentWillUpdate() {
    this.counter = this.counter + 1;
  }

  componentDidUpdate() {
    // this.onRegionChange();
    this.setState({
      updateMap: false
    })
  }

  componentWillUnMount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  onRegionChange(){
    console.log('POSITION UPDATING');
    console.log(this.props.position.longitude, this.props.position.latitude)
    const {longitude, latitude} = this.props.position;

    this.setState({
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      updateMap: true
    });
  }

  render() {
    const { longitude, latitude, accuracy } = this.props.position;
    const { region } = this.state;
    const { updatedPosition } = this.props;

    console.log(region);
    return(
      <View style={styles.container}>
        {updatedPosition &&
          <MapView
            initialRegion={region}
            onRegionChange={this.onRegionChange}
            style={styles.map} >



            </MapView>
        }
          <View style={styles.bottom}>
            <Text style={styles.coords}>Longitude: {this.props.position.longitude}</Text>
            <Text style={styles.coords}>Latitude: {this.props.position.latitude}</Text>
            <Text style={styles.coords}>accuracy: {this.props.position.accuracy}</Text>
            <Text style={styles.coords}>counter: {this.counter}</Text>
          </View>
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

  // const {
  //   isConnectedToSocket,
  //   socketC
  // } = socket;

  return {
    position,
    isConnectedToSocket,
    socketC,
    updatedPosition
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosition: () => dispatch(getPosition()),
    connectToSocket: () => dispatch(connectToSocketServer())
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
