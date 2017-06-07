import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import DeviceInformations from '../actions/deviceInformations';

var deviceInformations = new DeviceInformations();

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
      isLoading: null,
      apiResponse: null,
      apiCount: 0
    };
  }

  request() {
      fetch('http://163.172.29.197:3000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deviceInformations.toJSON())
      })
      .then(response => {
        this.state.apiCount++
        return this.state.apiResponse = response.status;
      })
      .catch (error => {
        return this.state.apiResponse = "fetch failed:" + error;
      })
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.heading}>DeviceView</Text>
        <Text>uuid: {deviceInformations.uuid}</Text>
        <Text>manufacturer: {deviceInformations.manufacturer}</Text>
        <Text>brand: {deviceInformations.brand}</Text>
        <Text>model: {deviceInformations.model}</Text>
        <Text>system: {deviceInformations.system}</Text>
        <Text>os_version: {deviceInformations.os_version}</Text>
        <Text>build_number: {deviceInformations.build_number}</Text>
        <Text>local: {deviceInformations.local}</Text>
        <Text>timezone: {deviceInformations.timezone}</Text>
        <Text>is_tablet: {deviceInformations.is_tablet}</Text>
        <Text>longitude: {deviceInformations.longitude}</Text>
        <Text>latitude: {deviceInformations.latitude}</Text>
        <Text>apiResponse: {this.state.apiResponse}</Text>
        <Text>number of request: {this.state.apiCount}</Text>
        <Button onPress={() => {deviceInformations.retry();this.forceUpdate()}} title="Update Infos" />
        <Button onPress={() => {this.request()}} title="Send Request to API" />
      </View>
    )
  }
}
