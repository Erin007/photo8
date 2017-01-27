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
import huntDetails from './HuntDetails';
import Profile from './Profile';
import addPlayers from './AddPlayers';
import styles from './styles';

class RosterOrganizer extends Component {
  state = { players: [], teamplayer: ''};

  componentWillMount(){
    //axios fetch all of the players associated with this team
    const url = 'https://treasure-chest-api.herokuapp.com/users/find/team/' + this.props.team.id

    axios.get(url).then( response => {
      console.log("response for Players on Team Organizer", response)
      return this.setState( { players: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });;
  }

  addPlayersPressed(){
    this._toAddPlayers()
  }

  _toAddPlayers = () => {
    this.props.navigator.push({
      title: 'Add Players',
      component: addPlayers,
      passProps: { hunt: this.props.hunt,
                   user: this.props.user,
                 team: this.props.team }
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

//navigate to the player's Profile
  _toProfile = (player) => {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: { player: player,
                  user: this.props.user},
    });
  }

  deletePlayerPressed(user){
    //find the teamplayer that associates this player with this team
    const url = 'https://treasure-chest-api.herokuapp.com/teamplayers/find/' + this.props.team.id + '/' + user.id

    axios.get(url)
    .then(response => {
      console.log(response);
      return this.setState( { teamplayer: response.data })
    })
    .then(this.deleteTeamPlayer.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }

//delete the returned teamplayer
  deleteTeamPlayer(){
    const url2 = 'https://treasure-chest-api.herokuapp.com/teamplayers/' + this.state.teamplayer.id

    axios.delete(url2).then( response => {
      console.log("teamplayer delete", response)
      return this.setState( { teamplayer: '' })
      })
      //fetch the new player list
      .then(this.componentWillMount())
      .catch(function (error) {
        console.log("Errors from delete request", error);
      });;
  }

  renderPlayers(){

    if (typeof this.state.players[0] !== 'undefined')  {

    return this.state.players.map(player =>
      <View style={styles.directivebox} key={player.id}>

        <TouchableOpacity onPress={() => this._toProfile(player)}>
          <Text style={styles.listitemsmallO} >
               {player.username}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.x} onPress={() => this.deletePlayerPressed(player)}>
          <Text>✘</Text>
        </TouchableOpacity>
      </View>
      );
    }
    return(
      <Text style={styles.smallertext}> There are not any players on this team yet. </Text>
    )
  }

  render(){
    return(
      <View style={styles.container}>

        <TouchableOpacity onPress={() =>
          this.seeHuntPressed()}>
          <Text style={styles.huntname}> { this.props.hunt.name } </Text>
        </TouchableOpacity>

        <Text style={styles.smalltext}> Players on {this.props.team.name} </Text>

        <View style={styles.smush}>
          <ScrollView>
            { this.renderPlayers() }
          </ScrollView>
        </View>

        <Button onPress={() => this.addPlayersPressed()}> Add Players </Button>
      </View>
    )
  }
}

export default RosterOrganizer;
