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
import huntDetails from './HuntDetails';
import styles from './styles';

class TeamList extends Component {
  state = { teams: [], thisplayersteam: {} };

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

    //make an axios call to see if the user is on a team
    const url = 'https://treasure-chest-api.herokuapp.com/teams/find/' + this.props.hunt.id + '/' + this.props.user.id

    axios.get(url).then( response => {
      console.log(response)
      return this.setState( { thisplayersteam: response.data })
     })
      .then(this.teamFound.bind(this))
      .catch(function (error) {
        console.log(error);
      });;
  }

  teamFound(){
    //tell the user which team they are on
    if (this.state.thisplayersteam.name != null){
      return (
        <Text style={styles.smallertext}>You are on {this.state.thisplayersteam.name} </Text>
      )
    }
    return( <Text style={styles.smallertext}>You are not on a team. </Text>
    )
  }

  seeRosterPressed(team){
    this._toRoster(team);
  }

  _toRoster(team){
    this.props.navigator.push({
      title: 'Players',
      component: Roster,
      passProps: { team : team,
                   user: this.props.user,
                   hunt: this.props.hunt,
                   teams: this.state.teams,
                   thisplayersteam: this.state.thisplayersteam}
    });
  }

//navigate to huntDetails
  seeHuntPressed() {
    this._toHuntDetails()
  }

  _toHuntDetails = () => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails,
      passProps: { hunt: this.props.hunt,
                  user: this.props.user}
    });
  }

  renderTeams(){
    //makes a clickable box for each team name, like in directive list
    if (typeof this.state.teams[0] !== 'undefined')  {

      return this.state.teams.map(team =>

        <TouchableOpacity onPress={() => this.seeRosterPressed(team)} key={ team.id } team={team}>

          <Text style={styles.listitem}>
               {team.name}             {team.points} pts
          </Text>
        </TouchableOpacity>
        );
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() => this.seeHuntPressed()}>
          <Text style={styles.huntname}> { this.props.hunt.name } </Text>
        </TouchableOpacity>

        <Text style={styles.smalltext}> Teams </Text>

        { this.teamFound() }

        <ScrollView style={styles.scrollview}>
          { this.renderTeams() }
        </ScrollView>

      </View>
    );
  }
}

export default TeamList;
