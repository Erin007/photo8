//HuntFinder.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import DirectiveList from './DirectiveList';
import Button from './common/Button';
import Input from './common/Input';
import Spinner from './common/Spinner';
import Card from './common/Card';
import CardSection from './common/CardSection';

class findHunt extends Component{

  state = { huntName: '', passcode: '', error: '', loading: false, huntId: ''}

  findPressed() {
    console.log('>>> Find Hunt Button Pressed!');

    const { huntName, passcode } = this.state;

    this.setState({ error: '', loading: true });
    console.log("this.state.huntName", this.state.huntName)

    //send the huntName and passcode to the API

    //if the API doesn't find a hunt that matches
      //this.noHuntFound.bind(this)

    //if the API finds a hunt that matches
      //this.huntFound.bind.(this)
    this._toDirectiveList();
  }

  noHuntFound(){
    this.setState({ error: 'No Hunts matching that name and passcode could be found.', loading: false })
  }

  huntFound(){
    console.log('a hunt was found!')
    //clear the form
    this.setState({
      huntName: '',
      passcode: '',
      error: '',
      loading: false
    })

      this._toDirectiveList(huntId);

  }

  _toDirectiveList = (huntId) => {
    this.props.navigator.push({
      title: 'Hunt',
      component: DirectiveList
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

          <CardSection>
            <Input
              label = "hunt:"
              placeholder = "Explore Seattle!"
              value = {this.state.huntName}
              onChangeText = {huntName => this.setState({ huntName })}/>
          </CardSection>

          <CardSection>
            <Input
              label = "passcode:"
              placeholder = "passcode"
              //secureTextEntry
              value = {this.state.passcode}
              onChangeText = {passcode => this.setState({ passcode })}/>
          </CardSection>

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 0
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    // marginTop: -70,
    // paddingTop: 10,
    fontFamily: 'Pacifico',
    //justifyContent: 'flex-start'
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    // marginTop: 70,
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
