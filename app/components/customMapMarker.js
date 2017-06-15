import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

const styles = StyleSheet.create({
  marker: {
    // borderRadius: 50,
    // borderWidth: 1,
    // // borderStyle: 'solid',
    // borderColor: 'red'
  },
  text: {
    color: 'blue'
  },

  arrow: {
    width: 0,
    height: 0,

    borderLeftWidth: 15,
    borderLeftColor: 'transparent',

    borderRightWidth: 15,
    borderRightColor: 'transparent',

    borderTopWidth: 15,
    borderTopColor: 'blue'
  }
});

export default class CustomMapMarker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.type);
  }

  render() {
    console.log('-------CUSTOM MARKER', this.props);
    const { location } = this.props;

    return (
      <View style={styles.marker}>
        <Image source={require('../assets/img/Group49.png')} />
        <View style={styles.arrow}></View>
      </View>
    );
  }
}
