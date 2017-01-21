//HuntListPlayer.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  SideMenu,
  ScrollView
} from 'react-native';
import Button from './common/Button';
import findHunt from './HuntFinder';
import axios from 'axios';

class HuntListPlayer extends Component {

  componentWillMount(){
    state = { hunts: [], hunt: {}, user: this.props.user };

    const url = 'https://treasure-chest-api.herokuapp.com/hunts/find/player/' + this.props.user.id

    axios.get(url).then( response => {
      console.log("response from HuntListPlayer", response)
      return this.setState( { hunts: response.data })
     })
      .catch(function (error) {
        console.log(error);
      });;
  }

  renderHunts(){
    if(this.state.hunts > 0){
      return(
        <Text> This is where there will be a loop at makes views for each hunt </Text>
      )
    }
    return <Text style={styles.smallertext}> You are not participating in any hunts </Text>
  }

  joinHuntPressed() {
    console.log('>>> Join Hunt Button Pressed!');
    this._toJoinHunt();
  }

  _toJoinHunt = () => {
    this.props.navigator.push({
      title: 'Join Hunt',
      component: findHunt,
      passProps: { user: this.props.user},
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>
           Snapenger Hunt
        </Text>

        <Text style={styles.text}>
           Hunts You Play
        </Text>

        {this.renderHunts()}

        <Button onPress={this.joinHuntPressed.bind(this)}>Join a New Hunt</Button>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    paddingTop: 10,
    fontFamily: 'Pacifico',
    justifyContent: 'flex-start'
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE'
  },
  smallertext: {
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Chalkboard SE',
    color: '#DCDCDC',
  }
});

export default HuntListPlayer;
