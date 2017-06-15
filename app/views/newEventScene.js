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
import {submitEvent} from '../actions/sockets';
import {submitAddEvent, successAddEvent} from '../actions/event';
import Slider from 'react-native-slider';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#f96363',
    alignItems: 'flex-start'
  },
  header: {
    flex: 0.1,
    width: width,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#f96363',
    alignItems: 'center'
  },
  content: {
    flex: 0.85,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    borderRadius: 10,
    paddingTop: 30,
    marginLeft: 3,
    marginRight: 3
  },
  footer: {
    flex: 0.05,
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  heading: {
    fontSize: 17,
    color: '#FFFFFF',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  label: {
    color: '#000000',
    fontSize: 17,
    fontWeight: 'bold',
    left: 20,
    height: 25
  },
  input: {
    width: width * .8,
    height: 45,
    alignSelf: 'center',
    borderColor: '#ebebeb',
    fontSize: 17
  },
  picker: {
    width: width * 0.8,
    height: 50,
    alignSelf: 'center'
  },
  submit: {
    marginBottom: 20,
    marginRight: 2,
    marginLeft: 2,
    flex: 0.49,
    backgroundColor: '#4c485a',
    borderRadius: 10
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
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
      eventtype: this.state.eventtype,
      user_id: this.props.id,
      longitude: this.props.newEvent.longitude,
      latitude: this.props.newEvent.latitude
    }
    this.props.successAddEvent();
    this.props.submitEvent(newevent, this.props.socketC);
    Actions.map({type: ActionConst.BACK})
  }

  backToMap() {
    const newevent = {
      people: this.state.people,
      title: this.state.title,
      description: this.state.description,
      hashtag: this.state.hashtag,
      eventtype: this.state.eventtype,
      user_id: this.props.id,
      longitude: this.props.newEvent.longitude,
      latitude: this.props.newEvent.latitude
    }
    this.props.submitAddEvent(newevent);
    Actions.map({type: ActionConst.BACK})
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return(
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>create event</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>title</Text>
        <TextInput
          style={styles.input}
          autofocus={true}
          maxLength={165}
          value={this.state.title}
          onChangeText={ (value) => {this.setState({title: value})} }
        />
        <Text style={styles.label}>select event type</Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.eventtype}
          onValueChange={(itemValue, itemIndex) => this.setState({eventtype: itemValue})}>
          <Picker.Item label="Incident" value="incident" />
          <Picker.Item label="Misc" value="misc" />
          <Picker.Item label="Party" value="party" />
          <Picker.Item label="Music" value="music" />
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Cultural" value="cultural" />
          <Picker.Item label="Sport" value="sport" />
          <Picker.Item label="Waiting" value="waiting" />
          <Picker.Item label="March" value="march" />
        </Picker>
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
        <Text style={styles.label}>about how many people</Text>
        <Slider
          style={{width: width * .8, height: 20, alignSelf: 'center', marginTop: 20}}
          minimumValue={10}
          maximumValue={2000}
          thumbTintColor={'#f96363'}
          minimumTrackTintColor={'#f96363'}
          maximumTrackTintColor={'#ededed'}
          value={this.props.newEvent.people}
          onValueChange={ (value) => {this.setState({people: value})}}
          step={1}
        />
        <Text style={styles.label}>{this.state.people}</Text>
        <View style={styles.buttonContainer}>
        <View style={styles.submit}>
          <Button
            style={styles.submit}
            onPress={ () => {this.backToMap()}}
            color={'#4c485a'}
            title="BACK TO MAP"
          />
        </View>
        <View style={styles.submit}>
          <Button
            onPress={ () => {this.sendForm()}}
            color={'#4c485a'}
            title="SUBMIT"
            />
        </View>
        </View>
        </View>
        <View style={styles.footer}>
        </View>
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
