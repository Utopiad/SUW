import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  marker: {
    flex: 1,
    backgroundColor: 'black',
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'red'
  }
});

export default class CustomMapMarker extends Component {

  render() {
    console.log('-------CUSTOM MARKER', this.props);
    const {location} = this.props;

    return (
      <View style={styles.marker}>
        <Text>{location.latitude}</Text>
        <Text>{location.longitude}</Text>
      </View>
    );
  }
}
