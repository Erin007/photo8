import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import axios from 'axios';
import huntDetails from './ShareHunt';
import DirectiveList from './DirectiveList'
import Button from './common/Button';
import Input from './common/Input';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Spinner from './common/Spinner';

class newHunt extends Component{

  state = { huntName: '', passcode: '', description: '', directives: [], directive: '', organizerId:'', error: '', loading: false}

  savePressed() {
    console.log('>>> Save Button Pressed!');

    const { huntName, passcode, description, directives, organizerId } = this.state;

    this.setState({ error: '', loading: true });
    //*****set the state of organizerID to the id of the user making this hunt via props

    //send the information to the API to make a new hunt
    console.log(this.state.huntName)
    axios.post('https://treasure-chest-api.herokuapp.com/hunts',{
      name: this.state.huntName,
      passcode: this.state.passcode,
      description: this.state.description,
      organizer_id: 1
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    //if the hunt is saved successfully
      //this.huntSaved.bind(this)

    //if there was a problem saving the hunt
      //this.huntNOTSaved.bind(this)
    this._toShareHunt();
  }

  huntNOTSaved(){
      this.setState({ error: 'There was an error saving your hunt.', loading: false })
  }

  huntSaved(){
    console.log("The hunt successfully saved")
    //clear the form

    //go to the Share Hunt page for this hunt - have to pass in the id as props to ShareHunt navigator action
      //this._toShareHunt();
  }

  _toShareHunt = () => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails
    });
  }

  renderSaveButton(){
    if (this.state.loading){
      return <Spinner size="small"/>
    }
    return(
      <Button onPress={this.savePressed.bind(this)}> Save </Button>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
           This is where there will be a form for users to make a new hunt!
        </Text>

        <Card>
          <CardSection>
            <Input
              label = "Name"
              placeholder = "Explore the Emerald City!"
              value = {this.state.huntName}
              onChangeText = {huntName => this.setState({ huntName })}/>
          </CardSection>

          <CardSection>
            <Input
              label = "Passcode"
              placeholder = "I<3Seattle"
              value = {this.state.passcode}
              onChangeText = {passcode => this.setState({ passcode })}/>
          </CardSection>

          <CardSection>
            <Input
              label = "Description"
              placeholder = ""
              //secureTextEntry
              value = {this.state.description}
              onChangeText = {description => this.setState({ description })}/>
          </CardSection>

          <CardSection>
            <Input
              label = "Directive:"
              placeholder = "your group at the Space Needle"
              //secureTextEntry
              value = {this.state.directive}
              //What I need to do here is add the directive to an array of directives and then render the directives already in the array below the form so the user knows what they have already entered
              //maybe also a counter of how many directives are already attached to the hunt?
              onChangeText = {directive => this.setState({ directive })}/>
          </CardSection>

          <CardSection>
            {this.renderSaveButton()}
          </CardSection>
        </Card>
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
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 10
  },
});

export default newHunt;
