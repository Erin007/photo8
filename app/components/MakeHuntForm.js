import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import axios from 'axios';
import huntDetails from './HuntDetails';
import DirectiveList from './DirectiveList'
import addDirectives from './AddDirectives';
import Button from './common/Button';
import Input from './common/Input';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Spinner from './common/Spinner';

class newHunt extends Component{

  state = { huntName: '', passcode: '', description: '', organizerId:'', huntID: '', error: '', loading: false}

  savePressed() {
    console.log('>>> Save Button Pressed!');

    const { huntName, passcode, description, directives, organizerId } = this.state;

    this.setState({ error: '', loading: true });
    //*****set the state of organizerID to the id of the user making this hunt via props

    //send the information to the API to make a new hunt
    //console.log(this.state.huntName)
    axios.post('https://treasure-chest-api.herokuapp.com/hunts',{
      name: this.state.huntName,
      passcode: this.state.passcode,
      description: this.state.description,
      organizer_id: 1
    })
    .then(response => {
      return this.setState( { huntId: response.data.id })
    })
      //if the hunt is saved successfully
    .then(this.huntSaved.bind(this))
    //if there was a problem saving the hunt
    .catch((error) => {
      console.log("The hunt did not save")

      this.setState({ error: "There was an error saving your hunt. Please, try again.", loading: false })

      console.log("Error:", error)
    });
  }

  huntSaved(){
    console.log("The hunt successfully saved")

    //clear the form
    this.setState({
      huntName:'',
      passcode: '',
      description: '',
      loading: false,
      error: ''
    })
    console.log("huntId is: ", this.state.huntId)
    //go to the AddDirectives page for this Hunt, have to pass the hunt id as props to the AddDirectives navigator action
    this._toAddDirectives(this.state.huntId);
  }

  _toAddDirectives = (huntId) => {
    this.props.navigator.push({
      title: 'Add Directives',
      component: addDirectives,
      passProps: { huntId: huntId}
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
           Make a New Hunt
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

          <Text style= {styles.errorTextStyle}>
            { this.state.error }
          </Text>

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
    paddingTop: 10,
    fontFamily: 'Chalkboard SE'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});

export default newHunt;
