import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {submitEvent} from '../actions/sockets';
import {Slider} from 'react-native-slider';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

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
  }
});

class newEventScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      people: 400
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

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.heading}>create event</Text>
        <Text>Longitude: {this.props.newEvent.position.longitude}</Text>
        <Text>Latitude: {this.props.newEvent.position.latitude}</Text>
        <Slider
            style={{width: 300, height: 40}}
            minimumValue={10}
            maximumValue={2000}
            value={this.state.people}
            onValueChange={ (value) => {this.setState({people: value})}} step={1} />
        <Text>{this.state.people}</Text>
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
    submitEvent: (event, socketC) => dispatch(submitEvent(event, socketC))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(newEventScene);
