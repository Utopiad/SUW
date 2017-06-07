import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import DeviceInformations from '../actions/deviceInformations';

const deviceInformations = new DeviceInformations();

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

export default class DeviceView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null
    };
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.heading}>DeviceView</Text>
        <Text>UUId: {deviceInformations.uuid}</Text>
        <Text>manufacturer: {deviceInformations.manufacturer}</Text>
        <Text>brand: {deviceInformations.brand}</Text>
        <Text>model: {deviceInformations.model}</Text>
        <Text>os: {deviceInformations.os}</Text>
        <Text>osVersion: {deviceInformations.osVersion}</Text>
        <Text>builNumber: {deviceInformations.buildNumber}</Text>
        <Text>localLang: {deviceInformations.localLang}</Text>
        <Text>country: {deviceInformations.country}</Text>
        <Text>timeZone: {deviceInformations.timeZone}</Text>
        <Text>isTablet: {deviceInformations.isTablet}</Text>
      </View>
    )
  }
}
