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
  },

  icon: {
    width: 32,
    height: 32
  }
});

export default class CustomMapMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null
    };
  }

  componentWillMount() {
    console.log(this.props.imagePath);
  }

  findImage(type) {
    if(type === 'cultural') {
      return require('../assets/img/icons-culture.png');

    } else if (type === 'food') {
      return require('../assets/img/icons-food.png');

    } else if (type === 'march') {
      return require('../assets/img/icons-march.png');

    } else if (type === 'misc') {
      return require('../assets/img/icons-miscellaneous.png');

    } else if (type === 'music') {
      return require('../assets/img/icons-music.png');

    } else if (type === 'party') {
      return require('../assets/img/icons-party.png');

    } else if (type === 'sport') {
      return require('../assets/img/icons-sport.png');

    } else if (type === 'waiting') {
      return require('../assets/img/icons-waiting.png');

    } else if (type === 'incident') {
      return require('../assets/img/icons-warning.png');

    }
  }

  render() {
    console.log('-------CUSTOM MARKER', this.props);
    const { location, type } = this.props;

    const path = this.findImage(type);
    return (
      <View style={styles.marker}>
        <Image source={path} style={styles.icon} />
        <View style={styles.arrow}></View>
      </View>
    );
  }
}
