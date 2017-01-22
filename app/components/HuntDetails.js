//HuntDetails.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import Button from './common/Button';
import DirectiveList from './DirectiveList';
import TeamList from './TeamList';
import Submissions from './Submissions';
import DirectiveListOrganizer from './DirectiveListOrganizer';
import TeamListOrganizer from './TeamListOrganizer';
import SubmissionsOrganizer from './SubmissionsOrganizer';

class huntDetails extends Component{

//to the player pages for directives, teams and submissions
  seeDirectives() {
    console.log('>>> seeDirectives Button Pressed!');
    this._toDirectiveList();
  }

  _toDirectiveList = () => {
    this.props.navigator.push({
      title: 'Hunt',
      component: DirectiveList,
      passProps: { hunt : this.props.hunt,
                   user : this.props.user}
    });
  }

  seeTeams() {
    console.log(' a player wants to see the teams');
    this._toTeamList();
  }

  _toTeamList = () => {
    this.props.navigator.push({
      title: 'Teams',
      component: TeamList,
      passProps: { hunt : this.props.hunt,
                   user : this.props.user}
    });
  }

  seeSubmissions(){
    console.log('a player wants to the see the submissions');
    this._toSubmissions();
  }

  _toSubmissions = () => {
    this.props.navigator.push({
      title: 'Submissions',
      component: Submissions,
      passProps: { hunt : this.props.hunt,
                   user : this.props.user}
    });
  }

//to the organizer pages for directives, teams and submissions
  directivesOrganizer(){
    console.log('The Organizer wants to the see the directives');
    this._toDirectiveListOrganizer();
  }

  _toDirectiveListOrganizer = () => {
    this.props.navigator.push({
      title: 'Hunt',
      component: DirectiveListOrganizer,
      passProps: { hunt : this.props.hunt,
                   user : this.props.user}
    });
  }

  teamsOrganizer(){
    console.log('The Organizer wants to the see the teams');
    this._toTeamListOrganizer();
  }

  _toTeamListOrganizer = () => {
    this.props.navigator.push({
      title: 'Teams',
      component: TeamListOrganizer,
      passProps: { hunt : this.props.hunt,
                   user : this.props.user}
    });
  }

  submissionsOrganizer(){
    console.log('The Organizer wants to the see the submissions');
    this._toSubmissionsOrganizer();
  }

  _toSubmissionsOrganizer = () => {
    this.props.navigator.push({
      title: 'Submissions',
      component: SubmissionsOrganizer,
      passProps: { hunt : this.props.hunt,
                   user : this.props.user}
    });
  }

  renderButtons(){
    //if the user is the organizer
    if (this.props.hunt.organizer_id == this.props.user.id){
      return(
        <View>
          <Button onPress={this.directivesOrganizer.bind(this)}> Directives</Button>

          <Button onPress={this.teamsOrganizer.bind(this)}> Teams </Button>

          <Button onPress={this.submissionsOrganizer.bind(this)}> Submissions </Button>
        </View>
      );
    }
    //if the user is NOT the organizer
    return(
      <View>
        <Button onPress={this.seeDirectives.bind(this)}> Directives </Button>

        <Button onPress={this.seeTeams.bind(this)}> Teams </Button>

        <Button onPress={this.seeSubmissions.bind(this)}> Submissions </Button>
      </View>
    )
  }

  render() {

    return (
      <ScrollView style={styles.container}>

        <Text style={styles.huntname}> { this.props.hunt.name } </Text>

        <Text style={styles.text}>Passcode: { this.props.hunt.passcode }</Text>

        <Text style={styles.smallertext}>{this.props.hunt.description} </Text>

        {this.renderButtons()}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  huntname:{
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Pacifico',
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    padding: 5,
    marginLeft: 25,
    marginRight: 15,
    fontFamily: 'Chalkboard SE'
  },
  smallertext: {
    fontSize: 14,
    textAlign: 'left',
    padding: 5,
    marginLeft: 25,
    marginRight: 15,
    fontFamily: 'Chalkboard SE'
  },
});

export default huntDetails;
