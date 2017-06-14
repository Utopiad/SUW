import React, { Component } from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import CustomMapMarker from '../components/customMapMarker';

class MarkerCollection extends Component {
  render() {
    console.log('------- MARKER COLLECTION', this.props.events.collection);
    const {collection} = this.props.events;

    return(
      <View>
        {collection.map((marker, i) => {
            return <MapView.Marker
              coordinate={marker.location}
              key={i}
              >
                <CustomMapMarker key={i} {...marker} />
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

export default connect(mapStateToProps)(MarkerCollection);
