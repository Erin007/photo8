//AddDirective.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import AddTeams from './AddTeams'
import Button from './common/Button';
import InputPlus from './common/InputPlus';
import Spinner from './common/Spinner';
import DirectiveListOrganizer from './DirectiveListOrganizer';
import huntDetails from './HuntDetails';
import axios from 'axios';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import styles from './styles';

class addDirectives extends Component {
  state = { directive: '', huntId:'', error: '', loading: false, hunt: {}, directives : []}

  componentWillMount (){
    //find the directives by the the hunt id
    const url = 'https://treasure-chest-api.herokuapp.com/directives/find/' + this.props.hunt.id

    axios.get(url).then( response => {
      console.log("response from directivelist", response)
      return this.setState( { directives: response.data })
     })
      .catch(function (error) {
        console.log(error);
      });;
  }

  addDirectivePressed(directive){
    dismissKeyboard()

    axios.post('https://treasure-chest-api.herokuapp.com/directives',{
      name: this.state.directive,
      point_value: 1,
      hunt_id: this.props.hunt.id,
      description: ""
    })
    .then(response => {
      console.log("response", response)
      return this.setState( { directive: response.data })
    })
      //if the directive is saved successfully
    .then(this.componentWillMount())
    //if there was a problem saving the directive
    .catch((error) => {
      this.setState({ error: "There was an error saving your directive. Please try again.", loading: false })
      console.log(error)
    });

    //clear the form
    this.setState({
      directive: '',
      loading: false,
      error: ''
    })
  }

//navigate to huntDetails
  seeHuntPressed() {
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

//navigate back to the DirectiveListOrganizer
  seeDirectivesPressed() {
    this._toDirectiveList()
  }

  _toDirectiveList = () => {
    this.props.navigator.push({
      title: 'Directives',
      component: DirectiveListOrganizer,
      passProps: { hunt: this.props.hunt,
                  user: this.props.user}
    });
  }

//helper functions to render things
  renderDirectives() {

    if (this.state.directives[0] !== '')  {
      console.log(this.state.directives)

      return this.state.directives.map(directive =>

          <Text style={styles.smallcenteredtext} key={directive.id}>
              {directive.name}
          </Text>
      );
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() =>
        this.seeHuntPressed()}>
          <Text style={styles.huntname}>
            {this.props.hunt.name}
          </Text>
        </TouchableOpacity>

        <Text style={styles.smallcenteredtext}>
          What should the hunters look for?
        </Text>

        <View style={styles.directivebox}>
          <InputPlus
            label = ""
            placeholder = "directive"
            value = {this.state.directive}
            onChangeText = {directive => this.setState({ directive })}/>

            <TouchableOpacity style={styles.plus} onPress={() => this.addDirectivePressed(this.state.directive)}>
              <Text style={styles.plussymbol}>✚</Text>
            </TouchableOpacity>
        </View>

        <Text style= {styles.errorTextStyle}>
          { this.state.error }
        </Text>

        <ScrollView style={styles.scrollview}>
          {this.renderDirectives()}
        </ScrollView>

        <Button style={styles.bottombutton} onPress={() =>
          this.seeDirectivesPressed()}> See Directives
        </Button>

      </View>
    )
  }
}

export default addDirectives;
