//AddPlayers.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text } from 'react-native';
import axios from 'axios';
import Button from './common/Button';
import huntDetails from './HuntDetails';
import RosterOrganizer from './PlayersOnTeamOrganizer';

class addPlayers extends Component {
  render(){
    return(
      <Text> This is where the organizer can add players </Text>
    )
  }
}

export default addPlayers;
//Enter a potential player's email

  //check if that email is already associated with a user in the database => Axios find-user-by-email-get request that returns acces to the user id
    //if the player already exists, make a team-player object post to axios

    //if the player doesn't exist yet, tell the organizer to invite them to sign up
