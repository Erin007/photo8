import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import axios from 'axios';
import huntDetails from './HuntDetails';
import DirectiveList from './DirectiveList'
import addDirectives from './AddDirectives';
import Button from './common/Button';
import Input from './common/Input';
import Spinner from './common/Spinner';

class newHunt extends Component{

  state = { huntName: '', passcode: '', description: '', organizerId:'', huntID: '', error: '', loading: false, hunt: {}}

  savePressed() {
    console.log('>>> Save Button Pressed!');

    const { huntName, passcode, description, directives, organizerId } = this.state;

    this.setState({ error: '', loading: true });

    //send the information to the API to make a new hunt
    axios.post('https://treasure-chest-api.herokuapp.com/hunts',{
      name: this.state.huntName,
      passcode: this.state.passcode,
      description: this.state.description,
      organizer_id: this.props.user.id
    })
    .then(response => {
      console.log("response", response)
      return this.setState( { hunt: response.data })
    })
      //if the hunt is saved successfully
    .then(this.huntSaved.bind(this))
    //if there was a problem saving the hunt
    .catch((error) => {
      console.log("The hunt did not save")

      this.setState({ error: "There was an error with your hunt. Please try again.", loading: false })

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
    console.log("hunt is: ", this.state.hunt)
    //go to the AddDirectives page for this Hunt, have to pass the hunt id as props to the AddDirectives navigator action
    this._toAddDirectives(this.state.hunt);
  }

  _toAddDirectives = (hunt) => {
    this.props.navigator.push({
      title: 'Add Directives',
      component: addDirectives,
      passProps: { hunt: hunt,
                  user: this.props.user}
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
        <Text style={styles.welcome}>
           Snapenger Hunt
        </Text>

        <ScrollView style={styles.scrollview}>
          <Text style={styles.text}>
             Make a New Hunt
          </Text>

          <Input
            label = ""
            placeholder = "name"
            value = {this.state.huntName}
            onChangeText = {huntName => this.setState({ huntName })}/>

          <Input
            label = ""
            placeholder = "passcode"
            value = {this.state.passcode}
            onChangeText = {passcode => this.setState({ passcode })}/>

          <Input
            label = ""
            placeholder = "description"
            //secureTextEntry
            value = {this.state.description}
            onChangeText = {description => this.setState({ description })}/>

          <Text style= {styles.errorTextStyle}>
            { this.state.error }
          </Text>


            {this.renderSaveButton()}
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50
  },
  scrollview:{
    marginTop: -50
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    fontFamily: 'Chalkboard SE'
  },
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
    fontFamily: "Chalkboard SE",
    marginLeft: 5,
    //marginRight: 15,
    textAlign: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    marginBottom: 10
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    // paddingTop: 10,
    fontFamily: 'Pacifico',
  },
});

export default newHunt;
