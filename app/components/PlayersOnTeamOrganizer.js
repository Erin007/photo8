//PlayersOnTeamListOrganizer.js
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




class RosterOrganizer extends Component {

  render(){
    return(
      <View style={styles.container}>
        <Text> This is where there will be a list of all of the players on the selected team and the organizer can delete players. </Text>

        <Button> Add Players </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 75,
    paddingBottom: 80
  },
})
export default RosterOrganizer;
