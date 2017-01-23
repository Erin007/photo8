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

class RosterOrganizer extends Component {
  state = { users: [], teamplayer: ''};

  componentWillMount(){
    console.log("componentwillmount in player organizer")
    console.log("this.state", this.state)
    //axios fetch all of the players associated with this team
    const url = 'https://treasure-chest-api.herokuapp.com/users/find/team/' + this.props.team.id

    axios.get(url).then( response => {
      console.log("response for Players on Team Organizer", response)
      return this.setState( { users: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });;
  }

  deletePlayerPressed(user){
    console.log('delete player pressed')
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
    console.log("rendering players organizer")
    console.log('this.state', this.state)
    if (typeof this.state.users !== 'undefined')  {

    return this.state.users.map(user =>
      <View style={styles.playerbox}>
        <Text style={styles.team} key={user.id}>
             {user.username}
        </Text>

        <TouchableOpacity style={styles.x} onPress={() => this.deletePlayerPressed(user)}>
          <Text>✘</Text>
        </TouchableOpacity>
      </View>
      );
    }
  }

//navigate to huntDetails
  seeHuntPressed() {
    console.log('seeHunt pressed');
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

  render(){
    return(

      <View style={styles.container}>

        <TouchableOpacity onPress={() =>
          this.seeHuntPressed()}>
          <Text style={styles.text}> { this.props.hunt.name } </Text>
        </TouchableOpacity>

        <Text style={styles.smalltext}> Players on {this.props.team.name} </Text>

        <ScrollView style={styles.scrollview}>
          { this.renderPlayers() }
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 40,
    paddingBottom: 90
  },
  playerbox: {
    flexDirection: 'row',
    marginBottom: 5,
    width: 300
  },
  x:{
    width: 40,
    height: 40,
    backgroundColor: "#21b6cb",
    paddingTop: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#167c89',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor:'#167c89',
    marginTop: 12
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
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE'
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
    width: 225
  },
  scrollview: {
    height: 300,
  },
})
export default RosterOrganizer;
