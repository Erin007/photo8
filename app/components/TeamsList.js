//TeamList.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text } from 'react-native';
import axios from 'axios';
import Roster from './PlayersOnTeam';

class TeamList extends Component {

  checkUserTeam(){
    //make an axios call to get all of the player ids associated with this hunt

    //check if the current user id matches any of those player ids
      //if it does match, tell the user which team they are on
        //axios call with the team id from from the team-player, display the name of the team

      //if it doesn't match prompt user to select a team to join
  }

  componentWillMount(){
    //make the axios call to retrieve all of the teams associated with this hunt
  }

  deleteTeamPressed(team){
    //confirm that the user is the organizer

    //confirm that the user wants to delete the team

    //delete the team from the database with axios

    //re-make the call to axios to retrieve the teams associated with the hunt

    //re-render the teams
  }

  seeRosterpressed(team){
    //handles going to the roster
    this._toRoster(team);
  }

  _toRoster(team){
    this.props.navigator.push({
      title: 'Players',
      component: Roster,
      passProps: { team : team}
    });
  }

  renderTeams(){
    //makes a clickable box for each team name, like in directive list
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This will have a list of all of the teams associated with the hunt. Clicking on one of the teams will show you a list of the players on that team. Players will have the option to select and join a team or they will be told which team they have already been placed on. </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 20,
    fontFamily: 'Pacifico'
  },
});

export default Roster;
