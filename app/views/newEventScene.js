import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Button
} from 'react-native';
import {submitEvent} from '../actions/sockets';
import {submitAddEvent, successAddEvent} from '../actions/event';
import Slider from 'react-native-slider';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start'
  },
  heading: {
    fontSize: 24,
    color: '#2E5077',
    alignSelf: 'center'
  },
  label: {
    color: '#000000',
    fontSize: 17,
    fontWeight: 'bold',
    left: 20,
    height: 20
  },
  input: {
    width: width * .8,
    height: 40,
    alignSelf: 'center',
    borderColor: '#ebebeb',
    fontSize: 17
  },
  submit: {
    alignSelf: 'center',
  }
});

class newEventScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      people: this.props.newEvent.people,
      title: this.props.newEvent.title,
      description: this.props.newEvent.description,
      hashtag: this.props.newEvent.hashtag,
      eventtype: this.props.newEvent.eventtype
        // longitude: this.props.newEvent.longitude,
        // latitude: this.props.newEvent.latitude
    };
  }

  componentDidMount() {
    const {socketC, id} = this.props;

    /*/
      EVENT SUBMIT SOCKET
    /*/
    // console.log(id);
    // const event = {
    //   user_id: id,
    //   nbr_participant: 124,
    //   name: 'Submit test',
    //   type: 'music',
    //   description: 'Lorenzo fait un concert dans le coin, que du sale',
    //   hashtag: '#LorenzoTrash',
    //   longitude: 48.86593862195033,
    //   latitude: 2.4298185110092163,
    // };
    //
    // this.props.submitEvent(event, socketC);
  }

  // componentWillMount() {
  //   this.setState(state => ({
  //     ...state,
  //     isLoading: true
  //   }));
  // }

  sendForm() {
    const newevent = {
      people: this.state.people,
      title: this.state.title,
      description: this.state.description,
      hashtag: this.state.hashtag,
      // eventtype: this.state.eventtype,
      eventtype: 'party',
      user_id: this.props.id,
      longitude: this.props.newEvent.longitude,
      latitude: this.props.newEvent.latitude
    }
    this.props.successAddEvent();
    this.props.submitEvent(newevent, this.props.socketC);
    Actions.map()
  }

  backToMap() {
    const newevent = {
      people: this.state.people,
      title: this.state.title,
      description: this.state.description,
      hashtag: this.state.hashtag,
      // eventtype: this.state.eventtype,
      eventtype: 'party',
      user_id: this.props.id,
      longitude: this.props.newEvent.longitude,
      latitude: this.props.newEvent.latitude
    }
    this.props.submitAddEvent(newevent);
    Actions.map({type: ActionConst.BACK})
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.heading}>create event</Text>
        <Text style={styles.label}>title</Text>
        <TextInput
            style={styles.input}
            autofocus={true}
            maxLength={165}
            value={this.state.title}
            onChangeText={ (value) => {this.setState({title: value})} }
        />
        <Text style={styles.label}>description</Text>
        <TextInput
            style={styles.input}
            maxLength={300}
            value={this.state.description}
            onChangeText={ (value) => {this.setState({description: value})} }
        />
        <Text style={styles.label}>hashtag</Text>
        <TextInput
            style={styles.input}
            maxLength={300}
            value={this.state.hashtag}
            onChangeText={ (value) => {this.setState({hashtag: value})} }
        />
        <Slider
            style={{width: width * .8, height: 40, alignSelf: 'center'}}
            minimumValue={10}
            maximumValue={2000}
            value={this.props.newEvent.people}
            onValueChange={ (value) => {this.setState({people: value})}}
            step={1}
        />
        <Text>{this.state.people}</Text>
        <Button
            style={styles.submit}
            onPress={ () => {this.sendForm()}}
            title="SUBMIT"
        />
        <Button
            style={styles.submit}
            onPress={ () => {this.backToMap()}}
            title="BACK TO MAP"
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { user, routes, newEvent } = state;

  const {
    position,
    isConnectedToSocket,
    socketC,
    updatedPosition,
    profile,
    id
  } = user;

  return {
    position,
    isConnectedToSocket,
    socketC,
    updatedPosition,
    routes,
    newEvent,
    id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitEvent: (event, socketC) => dispatch(submitEvent(event, socketC)),
    submitAddEvent: (newEvent) => dispatch(submitAddEvent(newEvent)),
    successAddEvent: () => dispatch(successAddEvent())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(newEventScene);
