import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import {connect} from 'react-redux';


const styles = StyleSheet.create({
  marker: {
    borderRadius: 50,
    borderWidth: 1,
    // borderStyle: 'solid',
    borderColor: '#F00000',
    position: 'absolute',
    height: 100,
    width: 65
  },
  text: {
    color: '#f96363'
  },

  arrow: {
    width: 0,
    height: 0,

    borderLeftWidth: 16,
    borderLeftColor: 'transparent',

    borderRightWidth: 16,
    borderRightColor: 'transparent',

    borderTopWidth: 16,
    borderTopColor: '#f96363'
  },

  icon: {
    width: 32,
    height: 32
  }
});

class CustomMapMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.id !== this.props.id) {
      return true;
    }
    return false;
  }



  render() {
    console.log('-------CUSTOM MARKER', this.props);
    const { location, type, imagePath } = this.props;

    return (
    <View style={styles.marker}>
      <Image source={imagePath} style={styles.icon} />
      <Image source={require('../assets/img/wave_pin.png')} style={styles.iconStand}/>
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

export default connect(mapStateToProps)(CustomMapMarker);
