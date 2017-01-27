import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import huntDetails from './HuntDetails';
import DirectiveList from './DirectiveList'
import addDirectives from './AddDirectives';
import Button from './common/Button';
import Input from './common/Input';
import styles from './styles';
import Spinner from './common/Spinner';
import welcomeCopy from './WelcomeCopy';

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

//navigate the user to the 'home' page
  toHome(){
    this._toHome();
  }

  _toHome = () => {
    this.props.navigator.push({
      title: 'Home',
      component: welcomeCopy,
      passProps: { hunt : this.props.hunt,
                   user : this.props.user}
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
        <TouchableOpacity onPress={this.toHome.bind(this)}>
          <Text style={styles.welcome}>
             Snapenger Hunt
          </Text>
        </TouchableOpacity>

        <KeyboardAvoidingView behavior = 'padding'>
          <View>
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
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default newHunt;
