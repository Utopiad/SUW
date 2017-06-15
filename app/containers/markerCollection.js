import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import {openEvent} from '../actions/event';
import CustomMapMarker from '../components/customMapMarker';

class MarkerCollection extends Component {
  constructor(props) {
    super(props);

    // this.openEvent = this.props.openEvent.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {last_update} = this.props.events;

    if(nextProps.events.last_update > last_update) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    console.log('THE MARKER COLLECTION DID UPDATE !');
  }

<<<<<<< HEAD
  findImage(type) {
    switch(type) {
    case 'cultural':
      return require('../assets/img/icons-culture.png');
      break;
    case 'food':
      return require('../assets/img/icons-food.png');
      break;
    case 'march':
      return require('../assets/img/icons-march.png');
      break;
    case 'misc':
      return require('../assets/img/icons-miscellaneous.png');
      break;
    case 'music':
      return require('../assets/img/icons-music.png');
      break;
    case 'party':
      return require('../assets/img/icons-party.png');
      break;
    case 'sport':
      return require('../assets/img/icons-sport.png');
      break;
    case 'waiting':
      return require('../assets/img/icons-waiting.png');
      break;
    case 'incident':
      return require('../assets/img/icons-warning.png');
      break;
    }

  _onPress(e, marker) {
    console.log('_ONPRESS_ ----------------_ONPRESS_');
    console.log(e.nativeEvent);
    console.log(marker);
    this.props.openEvent(marker);
  }

  render() {
    console.log('------- MARKER COLLECTION', this.props.events.collection);
    const {collection} = this.props.events;

    return(
      <View>
        {collection.map((marker, i) => {
            const location = {
              latitude: marker.location[0],
              longitude: marker.location[1],
            };

            return <MapView.Marker
                  coordinate={location}
                  key={i}
                // onPress={this._onPress.bind(this, marker)}
                // anchor={{x: -0.5, y: -0.5}}
                >
                <MapView.Callout tooltip>
                    <CustomMapMarker
                      key={i}
                      imagePath={this.findImage(marker.type)}
                      onPress={(e) => {this._onPress(e, marker)}}
                      {...marker}
                    />
                </MapView.Callout>
              </MapView.Marker>
          })
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { socket } = state;

  const {
    events
  } = socket;

  return {
    events
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openEvent: (marker) => dispatch(openEvent(marker))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MarkerCollection);
