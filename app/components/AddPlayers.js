//AddPlayers.js
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
import InputPlus from './common/InputPlus';
import huntDetails from './HuntDetails';
import RosterOrganizer from './PlayersOnTeamOrganizer';


class addPlayers extends Component {
  state = { player: '', error: '', loading: false, players: [], email: ''}

  componentWillMount(){
    //axios fetch all of the players associated with this team
    const url = 'https://treasure-chest-api.herokuapp.com/users/find/team/' + this.props.team.id

    axios.get(url).then( response => {
      console.log(response)
      return this.setState( { players: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });;
  }

  addPlayerPressed(email){
    //look for the player by email in the backend => Axios find-user-by-email-post request that returns access to the player id (This is a post request, because as a get request the email isn't a viable param to put in a url)
    const url = 'https://treasure-chest-api.herokuapp.com/users/find/email'

    axios.post(url, {
      email: this.state.email
    })
     .then( response => {
      console.log(response)
      return this.setState( { player: response.data })
      })
      .then(this.checkForTeamPlayer.bind(this))
      .catch(function (error) {
        console.log(error);
      });;

    //clear the form
    this.setState({
      email: '',
      loading: false,
      error: ''
    })
  }

  checkForTeamPlayer(){
    //if the player already exists, make a team-player object post to axios
    if(this.state.player !== null){
      this.makeATeamPlayer()
      return
    }
    //if the player doesn't exist yet, tell the organizer to invite them to sign up
    this.setState( { error: "That email is not associated with a Snapenger Hunt user. Please tell them to sign up!"} )
  }

  makeATeamPlayer(){

    axios.post('https://treasure-chest-api.herokuapp.com/teamplayers',{
      player_id: this.state.player.id ,
      team_id: this.props.team.id,
    })
    .then(response => {
      console.log("response", response)
      this.setState({ thisplayersteam: response.data })
    })
      //if the teamplayer saved successfully, re-render the list of player names
    .then(this.componentWillMount())
    //if there was a problem saving the teamPlayer
    .catch((error) => {
      console.log("Error:", error)
    });
  }


//navigate to the hunt details
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

//navigate to the Team page
  seeTeamPressed(){
    this._toTeam()
  }

  _toTeam = () => {
    this.props.navigator.push({
      title: 'Team',
      component: RosterOrganizer,
      passProps: { hunt: this.props.hunt,
                   user: this.props.user,
                 team: this.props.team}
    });
  }

//render helper methods

  renderPlayers(){
    if (typeof this.state.players[0] !== 'undefined')  {

      return this.state.players.map(player =>
        <View key={player.id}>

            <Text style={styles.player}>
                 {player.username}
            </Text>

        </View>
      );
    }
  }

  render(){
    return(
      <View style={styles.container}>

        <TouchableOpacity onPress={() =>
        this.seeHuntPressed()}>
          <Text style={styles.name}>
            {this.props.hunt.name}
          </Text>
        </TouchableOpacity>

        <Text style={styles.teamname}>
          {this.props.team.name}
        </Text>

        <Text style={styles.text}>
          Enter the email address of the player you would like to add to this team.
        </Text>

        <View style={styles.playerbox}>
          <InputPlus
            label = ""
            placeholder = "player email"
            //secureTextEntry
            value = {this.state.email}
            onChangeText = {email => this.setState({ email })}/>

            <TouchableOpacity style={styles.plus} onPress={() => this.addPlayerPressed(this.state.email)}>
              <Text>✚</Text>
            </TouchableOpacity>
        </View>

        <Text style= {styles.errorTextStyle}>
          { this.state.error }
        </Text>

        <ScrollView style={styles.scrollview}>
          {this.renderPlayers()}
        </ScrollView>

        <Button onPress={() => this.seeTeamPressed()}> See Team </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 10
  },
  scrollview: {
    marginTop: 10,
    marginBottom: 10,
    height: 200,
  },
  playerbox: {
    flexDirection: 'row',
    marginBottom: 5,
    width: 300
  },
  plus:{
    width: 40,
    height: 40,
    backgroundColor: "#21b6cb",
    paddingTop: 12,
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#167c89',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor:'#167c89',
    marginTop: 12,
    alignItems: 'center',
  },
  name: {
    fontSize: 32,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    fontFamily: 'Pacifico'
  },
  teamname: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Chalkboard SE',
    paddingBottom: 15
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Chalkboard SE'
  },
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
    fontFamily: "Chalkboard SE",
    textAlign: 'center',
    // marginTop: -20,
  },
  player: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 5,
    fontFamily: 'Chalkboard SE',
    color: '#DCDCDC',
  }
});

export default addPlayers;
