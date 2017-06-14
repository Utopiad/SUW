import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {submitEvent} from '../actions/sockets';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2EC4B6',
    alignItems: 'center'
  },
  heading: {
    fontSize: 24,
    color: '#2E5077',
    alignItems: 'center'
  }
});

class newEventScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null
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
        <Text style={styles.heading}>CameraView !</Text>
        <Text>Longitude: {this.props.newEvent.position.longitude}</Text>
        <Text>Latitude: {this.props.newEvent.position.latitude}</Text>
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
