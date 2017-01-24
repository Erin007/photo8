//AddTeams.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import DirectiveList from './DirectiveList';
import Button from './common/Button';
import InputPlus from './common/InputPlus';
import Spinner from './common/Spinner';
import huntDetails from './HuntDetails';
import TeamListOrganizer from './TeamListOrganizer';
import axios from 'axios';


class addTeams extends Component{
  state = { error: '', loading: false, hunt: {}, teamName:'', teams: [], team: {} }

  componentWillMount (){

    const url = 'https://treasure-chest-api.herokuapp.com/teams/find/' + this.props.hunt.id

    axios.get(url).then( response => {
      console.log("response from directivelist", response)
      return this.setState( { teams: response.data })
     })
      .catch(function (error) {
        console.log(error);
      });;
  }

  addTeamPressed(teamName){
    console.log('>>> Add Team pressed');
    //axios post the team

    console.log(this.state.teamName)
    console.log(this.props.hunt.name)

    axios.post('https://treasure-chest-api.herokuapp.com/teams',{
      name: this.state.teamName,
      points: 0,
      hunt_id: this.props.hunt.id,
    })
    .then(response => {
      console.log("response", response)
      console.log("response.data", response.data)
      return this.setState( { team: response.data })
    })
      //if the team is saved successfully
    .then(this.componentWillMount())
    //if there was a problem saving the team
    .catch((error) => {
      console.log("The team did not save")

      this.setState({ error: "There was an error saving the team. Please try again.", loading: false })

      console.log(error)
    });

    //clear the form
    this.setState({
      teamName: '',
      loading: false,
      error: ''
    })
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

//navigate back to the TeamsListOrganizer
  seeTeamsPressed(){
    console.log("seeTeamsPressed")
    this._toTeamList()
  }

  _toTeamList = () => {
    this.props.navigator.push({
      title: 'Teams',
      component: TeamListOrganizer,
      passProps: { hunt: this.props.hunt,
                  user: this.props.user}
    });
  }

//helper functions to render things
  renderTeamNames() {
    console.log("rendering teams")
    if (this.state.teams[0] !== '')  {
      console.log(this.state.teams)

      return this.state.teams.map(team=>

          <Text style={styles.teamname} key={team.id}>
              {team.name}
          </Text>
      );
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() =>
          this.seeHuntPressed()}>
          <Text style={styles.name}>
            {this.props.hunt.name}
          </Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Which teams will participate in this hunt?
        </Text>

        <View style={styles.teambox}>
          <InputPlus
            label = ""
            placeholder = "team name"
            //secureTextEntry
            value = {this.state.teamName}
            onChangeText = {teamName => this.setState({ teamName })}/>

            <TouchableOpacity style={styles.plus} onPress={() => this.addTeamPressed(this.state.teamName)}>
              <Text>✚</Text>
            </TouchableOpacity>
        </View>

        <Text style= {styles.errorTextStyle}>
          { this.state.error }
        </Text>


        <ScrollView style={styles.scrollview}>
          {this.renderTeamNames()}
        </ScrollView>

        <Button style={styles.button} onPress={() =>
          this.seeTeamsPressed()}> See Teams
        </Button>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 50
  },
  scrollview:{
    marginTop: 10,
    marginBottom: 10,
    height: 180,
  },
  teambox:{
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
    paddingBottom: 20,
    fontFamily: 'Pacifico'
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
    marginTop: -20,
  },
  teamname: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 5,
    fontFamily: 'Chalkboard SE',
    color: '#DCDCDC',
  }
});

export default addTeams;
