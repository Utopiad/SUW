import React, { Component } from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import CustomMapMarker from '../components/customMapMarker';

class MarkerCollection extends Component {
  constructor(props) {
    super(props);

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

  findImage(marker) {
    const {type} = marker;

    
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

            const imagePath = this.findImage(marker);

            return <MapView.Marker
                coordinate={location}
                key={i}
                // anchor={{x: -0.5, y: -0.5}}
              >
                <CustomMapMarker
                  key={i}
                  imagePath={imagePath}
                  {...marker}
                />
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
