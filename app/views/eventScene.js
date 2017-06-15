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
import {voteEvent} from '../actions/sockets';
import {closeEvent} from '../actions/event';
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

    this.voteEvent = this.props.voteEvent.bind(this);
    this._onPress = this._onPress.bind(this);
    this.closeEvent = this.props.closeEvent.bind(this);
  }

  componentDidMount() {
    //Ouais il faut rename ce reducer
    console.log(this.props.newEvent);
  }

  _onPress(type) {
    const {newEvent, socketC, id} = this.props;

    const event = {
      id_user: id,
      id_event: newEvent.id,
      type: type,
      nbr_participants: newEvent.people
    };
    this.voteEvent(event, socketC);
    this.closeEvent();
    //
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
          <Button title='YES' onPress={() => this._onPress('upvote')} />
          <Button title='NO' onPress={() =>this._onPress('downvote')} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {newEvent, socket, user} = state;
  const {socketC} = socket;
  const {id} = user;
  return {
    newEvent,
    socketC,
    id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    voteEvent: (event, client) => dispatch(voteEvent(event, client)),
    closeEvent: () => dispatch(closeEvent())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventScene);
