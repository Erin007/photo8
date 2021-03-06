//HuntFinder.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import DirectiveList from './DirectiveList';
import TeamList from './TeamList';
import Button from './common/Button';
import Input from './common/Input';
import Spinner from './common/Spinner';
import axios from 'axios';

class findHunt extends Component{

  state = { huntName: '', passcode: '', error: '', loading: false, huntId: '', hunt: ''}

  findPressed() {

    const { huntName, passcode } = this.state;

    this.setState({ error: '', loading: true });

    //send the huntName to the API
    const url = 'https://treasure-chest-api.herokuapp.com/hunts/find/name/' + this.state.huntName

    axios.get(url).then( response => {
      console.log("response", response)
      this.setState( { hunt: response.data })
      this.checkForHunt()
    })
      .catch(function (error) {
        console.log(error);
      });;
  }

  checkForHunt(){

    if (this.state.hunt.length !== 0){
      //if the API finds a hunt that matches
      this.huntFound(this.state.hunt[0])
      return
    }
    //if the API doesn't find a hunt
      this.noHuntFound()
  }

  noHuntFound(){
    this.setState({ error: 'No hunt matching that name and passcode could be found.', loading: false, hunt: '' })
  }

  huntFound(){
    //clear the form
    this.setState({
      huntName: '',
      passcode: '',
      error: '',
      loading: false
    })
      this._toTeamsList(this.state.hunt[0]);
  }

  _toTeamsList = (hunt) => {
    this.props.navigator.push({
      title: 'Teams',
      component: TeamList,
      passProps: { hunt: hunt,
                   user: this.props.user}
    });
  }

  renderFindButton(){
    if (this.state.loading){
      return <Spinner size="small"/>
    }
    return(
      <Button onPress={this.findPressed.bind(this)}>Find</Button>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
           Snapenger Hunt
        </Text>

        <Text style={styles.text}>
           Please enter the hunt name and passcode given to you by the organizer.
        </Text>

        <Input
          label = ""
          placeholder = "hunt name"
          value = {this.state.huntName}
          onChangeText = {huntName => this.setState({ huntName })}/>

        <Input
          label = "passcode:"
          placeholder = "passcode"
          value = {this.state.passcode}
          onChangeText = {passcode => this.setState({ passcode })}/>

        <Text style= {styles.errorTextStyle}>
          { this.state.error }
        </Text>

        { this.renderFindButton() }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 60
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'Pacifico',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    paddingTop: 10,
    fontFamily: 'Chalkboard SE'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});

export default findHunt;
