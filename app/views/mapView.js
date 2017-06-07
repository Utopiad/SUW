import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#611C35',
    alignItems: 'center'
  },
  heading: {
    fontSize: 24,
    color: '#2EC4B6',
    alignItems: 'center'
  }
});

export default class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null
    };
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.heading}>MapView</Text>
      </View>
    )
  }
}
