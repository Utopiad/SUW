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

    // const path = this.findImage(type);
    // setTimeout
    return (
    <View style={styles.marker}>
      <Image source={imagePath} style={styles.icon} />
      <View style={styles.arrow}></View>
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
