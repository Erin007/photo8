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
import RosterOrganizer from './PlayersOnTeamOrganizer';
import addTeams from './AddTeams';
import huntDetails from './HuntDetails';
import styles from './styles';

class TeamListOrganizer extends Component {

  state = { teams: [], team: {} };

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

  deleteTeamPressed(team){
  //delete the team from the backend
    const url = 'https://treasure-chest-api.herokuapp.com/teams/' + team.id

    axios.delete(url)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  //fetch the new team list and update the state to show that list
    const url2 = 'https://treasure-chest-api.herokuapp.com/teams/find/' + this.props.hunt.id

    axios.get(url2).then( response => {
      return this.setState( { teams: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });;
  }

//navigate to the player list
  seeRosterPressed(team){
    this._toRoster(team);
  }

  _toRoster(team){
    this.props.navigator.push({
      title: 'Players',
      component: RosterOrganizer,
      passProps: { team : team,
                   user: this.props.user,
                   hunt: this.props.hunt,
                   teams: this.state.teams,
                   }
    });
  }

//navigate to the addTeams component
  addTeamsPressed(){
    this._toAddTeams()
  }

  _toAddTeams(){
    this.props.navigator.push({
      title: 'Add Teams',
      component: addTeams,
      passProps: { user: this.props.user,
                   hunt: this.props.hunt,
                   }
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

    if (typeof this.state.teams[0] !== 'undefined')  {

      return this.state.teams.map(team =>

        <View key={team.id} style={styles.directivebox}>
          <TouchableOpacity onPress={() => this.seeRosterPressed(team)} key={ team.id } team={team}>

            <Text style={styles.listitemsmallO}>
                 {team.name}               {team.points} pts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.x} onPress={() => this.deleteTeamPressed(team)}>
            <Text>✘</Text>
          </TouchableOpacity>

        </View>
        );
    }
    return(
      <Text style={styles.smallertext}> There are not any teams participating in this hunt yet. </Text>
    )
  }

  render(){
    return(
      <View style={styles.container}>

        <TouchableOpacity onPress={() =>
          this.seeHuntPressed()}>
          <Text style={styles.huntname}> { this.props.hunt.name } </Text>
        </TouchableOpacity>

        <Text style={styles.smalltext}> Teams </Text>

        <View style={styles.smush}>
        <ScrollView style={styles.scrollviewplayer}>
          { this.renderTeams() }
        </ScrollView>
        </View>

        <Button style={styles.addbutton} onPress={() => this.addTeamsPressed()}> Add Teams </Button>
      </View>
    );
  }
}

export default TeamListOrganizer;
