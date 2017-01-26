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
import Button from './common/Button';
import huntDetails from './HuntDetails';
import Profile from './Profile';


class Roster extends Component {
  state = { players: [], teamplayer: {}, thisplayersteam: ''}; // thisplayersteam is a teamplayer object

  componentWillMount(){
    //axios fetch all of the players associated with this team
    const url = 'https://treasure-chest-api.herokuapp.com/users/find/team/' + this.props.team.id

    axios.get(url).then( response => {
      console.log("response for Players on Team", response)
      return this.setState( { players: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });;
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

  renderPlayers(){

    if (typeof this.state.players[0] !== 'undefined')  {

    return this.state.players.map(player =>
      <View key={player.id}>

        <TouchableOpacity onPress={() => this._toProfile(player)}>
          <Text style={styles.team}>
               {player.username}
          </Text>
        </TouchableOpacity>

      </View>
      );
    }
    return(
      <Text style={styles.smallertext}> There are not any players on this team yet. </Text>
    )
  }

  renderButtons(){
    //if the user is not on a team show them join team button
    if (typeof this.props.thisplayersteam.name == 'undefined' && this.state.thisplayersteam == ''){

      return(
            <View style={styles.bottombuttons}>
              <Button onPress={() => this.joinTeamPressed() }> Join Team </Button>
            </View>
      );
    }
    //if the user is on this team, show them a leave team button
    const currentUserId = this.props.user.id
    const that = this

    if (typeof this.state.players !== 'undefined'){

      for (i = 0; i < this.state.players.length; i++) {
        if (this.state.players[i].id == currentUserId){
          //the user is on this team
          return(
            <View style={styles.bottombuttons}>
              <Button onPress={() => this.leaveTeamPressed() }> Leave Team </Button>
            </View>
          );
        }
      }
    }
  }

  joinTeamPressed(){
      //make an axios post to make a team-player object
      axios.post('https://treasure-chest-api.herokuapp.com/teamplayers',{
        player_id: this.props.user.id ,
        team_id: this.props.team.id,
      })
      .then(response => {
        console.log("response", response)
        this.setState({ thisplayersteam: response.data })
      })
        //if the teamplayer saved successfully, re-render the list of player names
      .then(this.reFetchPlayers.bind(this))
      //if there was a problem saving the teamPlayer
      .catch((error) => {
        console.log("Error:", error)
      });
  }

  leaveTeamPressed(){
    //make an axios get call for the teamplayer that pairs this user with this team
    const url = 'https://treasure-chest-api.herokuapp.com/teamplayers/find/' + this.props.team.id + '/' + this.props.user.id

    axios.get(url).then( response => {
      console.log("teamplayer", response)
      return this.setState( { teamplayer: response.data })
      })
      .then(this.deleteTeamPlayer.bind(this))
      .catch(function (error) {
        console.log(error);
      });;
  }

  deleteTeamPlayer(){
    //make an axios delete call using the returned id
    const url2 = 'https://treasure-chest-api.herokuapp.com/teamplayers/' + this.state.teamplayer.id

    axios.delete(url2).then( response => {
      console.log("teamplayer delete", response)
      return this.setState( { teamplayer: '' })
      })
      .then(this.reFetchPlayers.bind(this))
      .catch(function (error) {
        console.log("Errors from delete request", error);
      });;
  }

  reFetchPlayers(){
    //fetch the players list again and change the state to reflect the deletiion
    const url = 'https://treasure-chest-api.herokuapp.com/users/find/team/' + this.props.team.id

    axios.get(url).then( response => {
      console.log("response for Players on Team", response)
      return this.setState( { players: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });;
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

  render() {

    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() => this.seeHuntPressed()}>
          <Text style={styles.text}>{this.props.hunt.name}</Text>
        </TouchableOpacity>

        <Text style={styles.smalltext}> Players on {this.props.team.name} </Text>

        <ScrollView style={styles.scrollview}>
          { this.renderPlayers() }
        </ScrollView>

        {this.renderButtons() }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 35,
    flex: 1,
    paddingBottom: 60
  },
  text: {
    fontSize: 32,
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
    fontFamily: 'Chalkboard SE',
    color: '#DCDCDC',
  },
  team:{
    fontSize: 20,
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
    marginTop: -30,
    marginBottom: 25,
    height: 300,
  },
  bottombuttons:{
    marginTop: 20,
  }
});

export default Roster;
