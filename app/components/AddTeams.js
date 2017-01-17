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
import Card from './common/Card';
import CardSection from './common/CardSection';
import huntDetails from './HuntDetails';
import axios from 'axios';

class addTeams extends Component{
  state = { error: '', loading: false, hunt: {}, teamName:'', teams: [], team: {}, teamNames: []}

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
    .then(this.teamSaved(this.state.team))
    //if there was a problem saving the team
    .catch((error) => {
      console.log("The team did not save")

      this.setState({ error: "There was an error saving the team. Please try again.", loading: false })

      console.log(error)
    });
    //show the organizer the list of teams they've made so far by rendering them to the screen
    this.state.teamNames.push(teamName)
    console.log(teamName)
    console.log(this.state.teamNames)

    //clear the form
    this.setState({
      teamName: '',
      loading: false,
      error: ''
    })
  }

  teamSaved(team){
    console.log('<<<< Team Saved Called')
    //push the team into a list of teams associated with this hunt
    this.state.teams.push(team)
    console.log(team)
    console.log(this.state.teams)

    this.renderTeamNames()
  }

  seeHuntPressed(hunt) {
    console.log('>>> See Hunt pressed');
    console.log("this.props.hunt.name", this.props.hunt.name)
    console.log("hunt", hunt)
    this._toHuntDetails(hunt)
  }

  _toHuntDetails = (hunt) => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails,
      passProps: { hunt: hunt}
    });
  }

  renderTeamNames() {
    console.log("rendering teams")
    if (this.state.teamNames[0] !== '')  {
      console.log(this.state.teamNames)

      return this.state.teamNames.map(teamName=>

          <Text style={styles.teamname} key={teamName.length}>
              {teamName}
          </Text>
      );
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <Text style={styles.name}>
          {this.props.hunt.name}
        </Text>

        <Text>
          {this.props.hunt.description}
        </Text>

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
          this.seeHuntPressed(this.props.hunt)}> Next
        </Button>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: '',
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scrollview:{
    width: 300,
    margin: 5,
    height: 100,
    marginTop: -50
  },
  teambox:{
    flexDirection: 'row',
    marginBottom: 50
  },
  plus:{
    width: 30,
    height: 30,
    backgroundColor: "#21b6cb",
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#167c89',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor:'#167c89',
    marginTop: 15
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 20,
    //paddingBottom: 20,
    fontFamily: 'Pacifico'
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    //paddingTop: 20,
    fontFamily: 'Chalkboard SE'
  },
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
    fontFamily: "Chalkboard SE",
  //  marginLeft: 8,
    textAlign: 'center',
    marginTop: -20,
    //padding: 10,
  //  marginBottom: 10
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
