//PlayersOnTeam.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text } from 'react-native';
import axios from 'axios';


class Roster extends Component {

  componentWillMount(){
    //axios fetch all of the players associated with this hunt
  }

  renderButtons(){
    //check if the current user is already on a team
      //if they are already on a team, don't show the join team button

      //if they aren't on a team yet, show the join team button

      //if they are on this team, show the leave button
  }

  joinTeamPressed(){
    //confirm with the user that they would like to join the team

    //if they confirm that they want to be on the team:
      //make an axios post to make a team-player object

      //re-make an axios get request to fetch all of the players associated with this team
        //re-render the list of player names
  }

  leaveTeamPressed(){

  }


  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>This will have a list of player usernames. If the user is on the team they can leave, if they are not they can join </Text>
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
