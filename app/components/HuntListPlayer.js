//HuntListPlayer.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  SideMenu,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Button from './common/Button';
import findHunt from './HuntFinder';
import huntDetails from './HuntDetails';
import axios from 'axios';
import welcomeCopy from './WelcomeCopy';
import styles from './styles';

class HuntListPlayer extends Component {

  state = { hunts: [], hunt: {}, user: this.props.user };

  componentWillMount(){

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

    if (this.state.hunts.length > 0) {
      return this.state.hunts.map(hunt =>

        <TouchableOpacity onPress={() => this.huntShowPressed(hunt)} key={ hunt.id } hunt={hunt}>

          <Text style={styles.listitem}>
              {hunt.name}
          </Text>
        </TouchableOpacity>
      );
    }
    return <Text style={styles.text}> You are not participating in any hunts yet. </Text>
  }

  huntShowPressed(hunt){
    this._toHuntShow(hunt);
  }

  _toHuntShow = (hunt) => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails,
      passProps: { hunt: hunt,
                   user: this.state.user }
    });
  }

//navigate the user to the 'home' page
  toHome(){
    this._toHome();
  }

  _toHome = () => {
    this.props.navigator.push({
      title: 'Home',
      component: welcomeCopy,
      passProps: { hunt : this.props.hunt,
                   user : this.props.user}
    });
  }

  joinHuntPressed() {
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

        <TouchableOpacity onPress={this.toHome.bind(this)}>
          <Text style={styles.welcome}>
             Snapenger Hunt
          </Text>
        </TouchableOpacity>

        <Text style={styles.smalltext}>
           Hunts You Play
        </Text>

        <ScrollView style={styles.scrollview}>
          {this.renderHunts()}
        </ScrollView>

        <View style={styles.bottombutton}>
          <Button onPress={this.joinHuntPressed.bind(this)}> Join a New Hunt</Button>
        </View>

      </View>
    )
  }
}

export default HuntListPlayer;
