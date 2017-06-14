import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import {getPosition, user_id} from '../actions/__user';
import { socketPushRegionDragged, connectToSocketServer } from '../actions/sockets';
import {beginAddEvent} from '../actions/event';
// import {  } from '../actions/sockets';
import {connect} from 'react-redux';
import MapView from 'react-native-maps';
import {Actions} from 'react-native-router-flux';
import MarkerCollection from '../containers/markerCollection';

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
      isWatchPositionLaunched: false
      // markers: [{
      //   key: id,
      //   coordinate: {
      //     latitude: 48.86593862195033,
      //     longitude: 2.4298185110092163
      //   },
      //   pinColor: randomColor()
      // }]
    };

    this.map = null;
    this.counter = 0;
    this.onRegionChange = this.onRegionChange.bind(this);
    this.getPosition = this.props.getPosition.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    // this.user_id = this.props.user_id.bind(this);
    this.socketPushRegionDragged = this.props.socketPushRegionDragged.bind(this);
    this.watchId = null;
  }



  // () => {
  //   user_id.then((data)=>{
  //     console.log("Yes PAPAAAAAAAAAAAA !");
  //     console.log(data);
  //     getPosition(data, client);
  //   }).catch((error)=>{
  //     console.log("ERRRRRRRRRRRROOOOOOOOOOOOOOOOORRRRRRRRR !");
  //     console.log(error);
  //   });
  // }

  shouldComponentUpdate(nextProps) {
    const {isWatchPositionLaunched} = this.state;
    console.log(nextProps.connected);
    if(nextProps.isConnectedToSocket && nextProps.connected) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const {isWatchPositionLaunched} = this.state;
    const {socketC} = this.props;
    id++;
    user_id.then((response)=>{
      if ( !isWatchPositionLaunched ) {
        console.log('COUCOU CA MARCHE');
        console.log(response);
        this.watchId = this.props.getPosition(response, socketC);
        this.setState({
          isWatchPositionLaunched: true
        });
      }
    }).catch(err => {
      throw err;
    });
  }

  getCoordinates(e) {
    const markPosition = e.nativeEvent.coordinate;
    // addEvent(markPosition);
    this.props.beginAddEvent(markPosition);
    Actions.newevent();
    // this.setState({
    //   markers: [
    //     ...this.state.markers,
    //     {
    //       coordinate: markPosition,
    //       key: id++,
    //       color: randomColor()
    //     },
    //   ],
    // });
  }

  componentWillUnMount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  onRegionChange(region){
    console.log('POSITION UPDATING');
    const {socketC, id} = this.props;
    if(this.props.isConnectedToSocket) {
      this.props.socketPushRegionDragged({region}, id, socketC);
    }
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

            <MarkerCollection />
          </MapView>
        }
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  const { user, routes, newEvent, socket } = state;

  const {
    position,
    updatedPosition,
    profile,
    connected
  } = user;

  const {
    id
  } = profile;

  const {
    isConnectedToSocket,
    socketC
  } = socket;

  return {
    position,
    isConnectedToSocket,
    socketC,
    updatedPosition,
    routes,
    id,
    newEvent,
    connected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosition: (id, socketC) => dispatch(getPosition(id, socketC)),
    socketPushRegionDragged: (region, id, socketC) => dispatch(socketPushRegionDragged(region, id, socketC)),
    beginAddEvent: (coords) => dispatch(beginAddEvent(coords))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapScene);

/* créer component bottomBar contenant boutons :
- placer event
- profil
- notifications

créer component top bar:
- input recherche d'un lieu
- icone recherche trigger action

*/
