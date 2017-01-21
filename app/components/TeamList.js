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

  componentWillMount(){
    //make the axios call to retrieve all of the teams associated with this hunt
    const url = 'https://treasure-chest-api.herokuapp.com/teams/find/' + this.props.hunt.id

    axios.get(url).then( response => {
      return this.setState( { teams: response.data })
      })
      .then(this.checkUserTeam())
      .catch(function (error) {
        console.log(error);
      });;
  }

  checkUserTeam(){
    console.log('checking if the user is on a team')
    //make an axios call to see if the user is on a team
    const url = 'https://treasure-chest-api.herokuapp.com/teams/find/' + this.props.hunt.id + '/' + this.props.user.id

    axios.get(url).then( response => {
      console.log(response)
      return this.setState( { team: response.data })
     })
      .then(this.teamFound.bind(this))
      .catch(function (error) {
        console.log(error);
      });;
  }

  teamFound(){
    //tell the user which team they are on
    console.log('telling the user which team they are on')
    return (
      <Text style={styles.smallertext}>You are on {this.state.team.name} </Text>
    )
  }

  //if the call does NOT return a team
    //prompt the user to join a team


  seeRosterPressed(team){
    //handles going to the roster
    console.log('>>> A Team has been pressed!');
    this._toRoster(team);
  }

  _toRoster(team){
    this.props.navigator.push({
      title: 'Players',
      component: Roster,
      passProps: { team : team,
                   user: this.props.user,
                   hunt: this.props.hunt}
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
      passProps: { hunt : hunt,
                   user: this.props.user }
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

        <Text style={styles.text}> { this.props.hunt.name } </Text>

        <Text style={styles.smalltext}> Teams </Text>

        { this.teamFound() }

        <ScrollView style={styles.scrollview}>
          { this.renderTeams() }
        </ScrollView>

        <Button onPress={() => this.seeHuntPressed(this.props.hunt)}> See Hunt </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 10,
    fontFamily: 'Pacifico',
    marginTop: 10,
  },
  smalltext: {
    fontSize: 25,
    textAlign: 'center',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE'
  },
  smallertext: {
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
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
    paddingLeft: 10,
    width: 250
  },
  scrollview: {
    marginTop: -55,
    marginBottom: 25,
    //borderWidth: 3,
    //borderRadius: 5,
    height: 250,
  //  borderColor: '#ddd',
  }
});

export default TeamList;
