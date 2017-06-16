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
    console.log(this.props.marker);
  }

  _onPress(type) {
    const {marker, socketC, id} = this.props;

    const event = {
      id_user: id,
      id_event: marker.id,
      type: type,
      nbr_participants: marker.people
    };
    this.voteEvent(event, socketC);
    this.closeEvent();
    //
  }

  render() {
    const {marker} = this.props;
    return (
      <View style={styles.container}>
        <Text>Event id : {marker.id}</Text>
        <Text>Event latitude : {marker.latitude}</Text>
        <Text>Event longitude : {marker.longitude}</Text>
        <Text>Event title : {marker.title}</Text>
        <Text>Event description : {marker.description}</Text>
        <Text>Event people : {marker.people}</Text>
        <Text>Event eventtype : {marker.eventtype}</Text>
        <Text>Event hashtag : {marker.hashtag}</Text>
        <Text>Event id_user : {marker.id_user}</Text>

        <View>
          <Button title='YES' onPress={() => this._onPress('upvote')} />
          <Button title='NO' onPress={() =>this._onPress('downvote')} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {marker, socket, user} = state;
  const {socketC} = socket;
  const {id} = user;
  return {
    marker,
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
