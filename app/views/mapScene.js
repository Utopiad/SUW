import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar
} from 'react-native';
import {getPosition, isNewUser} from '../actions/__user';
import { socketPushRegionDragged, connectToSocketServer, voteEvent } from '../actions/sockets';
import {beginAddEvent} from '../actions/event';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import MarkerCollection from '../containers/markerCollection';
import SplashScreen from 'react-native-splash-screen';
import { DELAY_HIDE_SPLASHSCREEN } from '../constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f96363',
    alignItems: 'center'
  },
  heading: {
    fontSize: 18,
    color: '#000000',
    alignItems: 'center',
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    lineHeight: 45
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

class MapScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {},
      isWatchPositionLaunched: false
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

  componentDidMount() {
    setTimeout(function() {
      SplashScreen.hide();
    }, DELAY_HIDE_SPLASHSCREEN);
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.isConnectedToSocket && nextProps.connected) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const {isWatchPositionLaunched} = this.state;
    const {socketC} = this.props;

    isNewUser.then((response)=>{
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
    const {socketC, id} = this.props;

    /*/
      EVENT UP & DOWN VOTES SOCKET
    /*/
    // console.log(id);
    // const event = {
    //   id_user: id,
    //   id_event: '5941bccf68beb4001f91ef9a',
    //   type: 'downvote',
    //   nbr_participants: 1000
    // };
    // this.props.voteEvent(event, socketC);

    this.props.beginAddEvent(markPosition);
    Actions.newevent();
  }

  componentWillUnMount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  onRegionChange(region){
    console.log('REGION UPDATING');
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
      <StatusBar
        backgroundColor="#f96363"
        barStyle="dark-content"
      />
      <Text style={styles.heading}>Please, active your GPS, your network, and finally enjoy !</Text>
        {updatedPosition &&
          <MapView
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
            ref={ map => {this.map = map}}
            showsMyLocationButton={true}
            showsUserLocation={true}
            loadingEnabled={true}
            onLongPress={ (e) => {this.getCoordinates(e)}}
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
    connected,
    id
  } = user;

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
    beginAddEvent: (coords) => dispatch(beginAddEvent(coords)),
    voteEvent: (event, client) => dispatch(voteEvent(event, client))
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
