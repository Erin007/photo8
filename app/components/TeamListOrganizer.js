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

        <View key={team.id} style={styles.teambox}>
          <TouchableOpacity onPress={() => this.seeRosterPressed(team)} key={ team.id } team={team}>

            <Text style={styles.team}>
                 {team.name}     {team.points} pts
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
          <Text style={styles.text}> { this.props.hunt.name } </Text>
        </TouchableOpacity>

        <Text style={styles.smalltext}> Teams </Text>

        <ScrollView style={styles.scrollview}>
          { this.renderTeams() }
        </ScrollView>

        <Button onPress={() => this.addTeamsPressed()}> Add Teams </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#cce5e5',
    marginTop: 40,
    paddingBottom: 50
  },
  text: {
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'Pacifico',
    margin: 5,
    padding: 5,
    color: '#006666',
    textShadowColor: 'white',
    textShadowOffset:( {width: 1, height: 1} ),
    textShadowRadius: 1
  },
  smalltext: {
    fontSize: 25,
    textAlign: 'center',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
  },
  smallertext: {
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
  },
  team:{
    fontSize: 20,
    fontFamily: 'Chalkboard SE',
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#006666',
    backgroundColor: 'white',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 15,
    marginRight: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
    width: 225,
    color:  '#353839',
  },
  teambox: {
    flexDirection: 'row',
    marginBottom: 5,
    width: 300
  },
  x:{
    width: 40,
    height: 40,
    backgroundColor: "#006666",
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#167c89',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor: "#006666",
    marginTop: 12
  },
  scrollview: {
    marginTop: -55,
    height: 325,
    marginBottom: 15
  }
});

export default TeamListOrganizer;
