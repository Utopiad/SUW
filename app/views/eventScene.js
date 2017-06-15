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
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class EventScene extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //Ouais il faut rename ce reducer
    console.log(this.props.newEvent);
  }

  _onPress() {
    console.log(this.props.newEvent);
  }

  render() {
    const {newEvent} = this.props;
    return (
      <View style={styles.container}>
        <Text>Event id : {newEvent.id}</Text>
        <Text>Event latitude : {newEvent.latitude}</Text>
        <Text>Event longitude : {newEvent.longitude}</Text>
        <Text>Event title : {newEvent.title}</Text>
        <Text>Event description : {newEvent.description}</Text>
        <Text>Event people : {newEvent.people}</Text>
        <Text>Event eventtype : {newEvent.eventtype}</Text>
        <Text>Event hashtag : {newEvent.hashtag}</Text>
        <Text>Event id_user : {newEvent.id_user}</Text>

        <View>
          <Button title='onPress' onPress={this._onPress()}></Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {newEvent, socket} = state;
  const {socketC} = socket
  return {
    newEvent,
    socketC
  };
}

const mapDispatchToProps = (dispatch) => {
  voteEvent: (event, client) => dispatch(voteEvent(event, client))
}

export default connect(mapStateToProps)(EventScene);
