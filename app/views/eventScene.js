import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Button,
  Picker
} from 'react-native';
import Slider from 'react-native-slider';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

class EventScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Event id : {this.props.id}</Text>
      </View>
    );
  }
}

export default connect()(EventScene);
