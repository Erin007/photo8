//TeamListOrganizer.js
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


class TeamListOrganizer extends Component {

  state = { teams: [], team: {} };

  render(){
    return(
      <ScrollView>
        <Text> This is where there will be a list of  teams that the organizer can click on to see players, delete one from or click on a button to add teams </Text>
      </ScrollView>
    );
  }
}

export default TeamListOrganizer;
