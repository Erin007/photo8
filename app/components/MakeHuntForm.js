import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView
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
      this.setState({ error: "There was an error with your hunt. Please try again.", loading: false })
      console.log("Error:", error)
    });
  }

  huntSaved(){
    //clear the form
    this.setState({
      huntName:'',
      passcode: '',
      description: '',
      loading: false,
      error: ''
    })
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

        <KeyboardAvoidingView behavior = 'padding'>
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
              value = {this.state.description}
              onChangeText = {description => this.setState({ description })}/>

            <Text style= {styles.errorTextStyle}>
              { this.state.error }
            </Text>

            {this.renderSaveButton()}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#cce5e5',
    marginTop: 30
  },
  scrollview:{
    // marginTop: -50
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
  },
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
    fontFamily: "Chalkboard SE",
    marginLeft: 5,
    textAlign: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    marginBottom: 10
  },
  welcome: {
    fontSize: 42,
    textAlign: 'center',
    fontFamily: 'Pacifico',
    margin: 5,
    marginBottom: 20,
    padding: 5,
    color: '#006666',
    textShadowColor: 'white',
    textShadowOffset:( {width: 1, height: 1} ),
    textShadowRadius: 1
  },
});

export default newHunt;
