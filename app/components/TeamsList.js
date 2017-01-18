//TeamsList.js

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
import Button from './common/Button';
import DirectiveList from './DirectiveList';

class TeamList extends Component {
  state = { teams: [], team: {} };

  checkUserTeam(){
    //make an axios call to get all of the player ids associated with this hunt

    //check if the current user id matches any of those player ids
      //if it does match, tell the user which team they are on
        //axios call with the team id from from the team-player, display the name of the team

      //if it doesn't match prompt user to select a team to join
  }

  componentWillMount(){
    //make the axios call to retrieve all of the teams associated with this hunt
    const url = 'https://treasure-chest-api.herokuapp.com/teams/find/' + this.props.hunt.id

    axios.get(url).then( response => {
      return this.setState( { teams: response.data })
     })
      .catch(function (error) {
        console.log(error);
      });;
  }

  renderDeleteButtons(){
    //check if the current user is the organizer
      //if they are the organizer, render the delete buttons for each team
      //if they are not, don't show the delete buttons
  }

  deleteTeamPressed(team){
    //confirm that the user wants to delete the team

    //delete the team from the database with axios

    //re-make the call to axios to retrieve the teams associated with the hunt

    //re-render the teams
  }

  seeRosterPressed(team){
    //handles going to the roster
    console.log('>>> A Team has been pressed!');
    this._toRoster(team);
  }

  _toRoster(team){
    this.props.navigator.push({
      title: 'Players',
      component: Roster,
      passProps: { team : team }
    });
  }

  seeHuntPressed(hunt){
    console.log('>>> See Hunt Pressed!');
    this._toHunt(hunt);
  }

  _toHunt(hunt){
    this.props.navigator.push({
      title: 'Hunt',
      component: DirectiveList,
      passProps: { hunt : hunt }
    });
  }

  renderTeams(){
    //makes a clickable box for each team name, like in directive list
    if (typeof this.state.teams[0] !== 'undefined')  {

      return this.state.teams.map(team =>

        <TouchableOpacity onPress={() => this.seeRosterPressed(team)} key={ team.id } team={team}>

          <Text style={styles.team}>
               {team.name}
          </Text>
        </TouchableOpacity>
        );
    }
  }

  render() {
    return (
      <View style={styles.container}>

      <ScrollView>
        <Text style={styles.text}> { this.props.hunt.name } </Text>
        <Text style = {styles.smalltext}> Teams </Text>

        { this.renderTeams() }
      </ScrollView>

      <Button onPress={() => this.seeHuntPressed(this.props.hunt)}> See Hunt </Button>
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
    // marginTop: 75,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 20,
    fontFamily: 'Pacifico',
    marginTop: 75,
  },
  smalltext: {
    fontSize: 25,
    textAlign: 'center',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE'
  },
  team:{
    fontSize: 16,
    fontFamily: 'Chalkboard SE',
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 10
  }
});

export default TeamList;
