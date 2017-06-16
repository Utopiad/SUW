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
  }

  componentDidMount() {
    //Ouais il faut rename ce reducer
    console.log(this.props.newEvent);
  }

  _onPress() {
    console.log(this.props.newEvent);
  }

  backToMap() {
    Actions.map({type: ActionConst.BACK})
  }

  // render() {
  //   const {newEvent} = this.props;
  //   return (
  //     <View style={styles.container}>
  //       <Text>Event id : {newEvent.id}</Text>
  //       <Text>Event latitude : {newEvent.latitude}</Text>
  //       <Text>Event longitude : {newEvent.longitude}</Text>
  //       <Text>Event title : {newEvent.title}</Text>
  //       <Text>Event description : {newEvent.description}</Text>
  //       <Text>Event people : {newEvent.people}</Text>
  //       <Text>Event eventtype : {newEvent.eventtype}</Text>
  //       <Text>Event hashtag : {newEvent.hashtag}</Text>
  //       <Text>Event id_user : {newEvent.id_user}</Text>
  //
  //       <View>
  //         <Button title='onPress' onPress={this._onPress()}></Button>
  //       </View>
  //     </View>
  //   );
  // }



  render() {
    const {newEvent} = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Proxima</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Title: {newEvent.title}</Text>
          <Text style={styles.label}>Description: {newEvent.description}</Text>
          <Text style={styles.label}>People: {newEvent.people}</Text>
          <Text style={styles.label}>Event type: {newEvent.eventtype}</Text>
          <Text style={styles.label}>{newEvent.hashtag}</Text>
          <Text style={styles.question}>event still ongoing ?</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.submit}>
              <Button
                onPress={ () => {this.sendForm()}}
                color={'#53dd85'}
                title="YES"
                />
            </View>
            <View style={styles.submit}>
              <Button
                style={styles.submit}
                onPress={ () => {this.sendForm()}}
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
