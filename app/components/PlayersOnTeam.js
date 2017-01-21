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


class Roster extends Component {
  state = { users: [], user: this.props.user };

  componentWillMount(){
    //axios fetch all of the players associated with this team
    console.log('PlayerOnTeam team_id', this.props.team.id)
    const url = 'https://treasure-chest-api.herokuapp.com/user/find/team/' + this.props.team.id

    axios.get(url).then( response => {
      console.log("response for Players on Team", response)
      return this.setState( { users: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });;
  }

  renderPlayers(){
    if (typeof this.state.users !== 'undefined')  {

    return this.state.users.map(user =>

        <Text style={styles.team} key={user.id}>
             {user.username}
        </Text>
      );
    }
  }

  checkIfUserIsOnTeam(){
    console.log("checking if the user is on this team")
    console.log("this.state.users", this.state.users)

    const currentUserId = this.props.user.id
    const that = this

    if (typeof this.state.users !== 'undefined'){
      console.log("in the first if")

      for (i = 0; i < this.state.users.length; i++) {
        if (this.state.users[i].id == currentUserId){
          //the user is on this team
          return(
                <View style={styles.container}>
                  <Button> Leave Team </Button>
                </View>
          );
        }
      }
      console.log(this.props.team.id )
      return(
        <View style={styles.container}>
          <Button> Join Team </Button>
        </View>
      )
    }//end of first if
  }//end of checkIf function


  renderButtons(){
    console.log('rendering buttons')
    //this.checkIfUserIsOnTeam()
    //check if the current user is already on a team

      //if they are already on a team, other than this one, don't show any button

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

        <Text style={styles.text}>{this.props.hunt.name}</Text>

        <Text style={styles.smalltext}> Players </Text>

        { this.renderPlayers() }

        {this.checkIfUserIsOnTeam() }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50,
    flex: 1
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
    marginTop: 0,
    marginBottom: 25,
    //borderWidth: 3,
    //borderRadius: 5,
    height: 210,
  }
});

export default Roster;
