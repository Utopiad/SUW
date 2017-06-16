import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Button
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
    height: 25,
    marginBottom: 20
  },
  question: {
    color: '#000000',
    fontSize: 17,
    alignSelf: 'center',
    height: 25,
    marginTop: 80
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
    width: width * 0.49,
    backgroundColor: '#4c485a',
    borderRadius: 10
  },
  back: {
    marginTop: 20,
    width: width * 0.49,
    backgroundColor: '#4c485a',
    borderRadius: 10,
    alignSelf: 'center'
  },
  buttonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

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
    this.backToMap();
    this.closeEvent();
    //
  }

  backToMap() {
    Actions.map({type: ActionConst.BACK})
  }

  render() {
    const {marker} = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Proxima</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Title: {marker.title}</Text>
          <Text style={styles.label}>Description: {marker.description}</Text>
          <Text style={styles.label}>People: {marker.people}</Text>
          <Text style={styles.label}>Event type: {marker.eventtype}</Text>
          <Text style={styles.label}>{marker.hashtag}</Text>
          <Text style={styles.question}>event still ongoing ?</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.submit}>
              <Button
                onPress={() => this._onPress('upvote')}
                color={'#53dd85'}
                title="YES"
                />
            </View>
            <View style={styles.submit}>
              <Button
                style={styles.submit}
                onPress={() => this._onPress('downvote')}
                color={'#f53c47'}
                title="NO"
                />
            </View>
          </View>
        </View>
        <View style={styles.back}>
          <Button
            style={styles.submit}
            onPress={ () => {this.backToMap()}}
            color={'#4c485a'}
            title="BACK TO MAP"
            />
        </View>
        <View style={styles.footer}>
        </View>
      </View>
    )
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
