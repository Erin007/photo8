//DirectiveListOrganizer.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text } from 'react-native';
import axios from 'axios';
import Button from './common/Button';
import addDirectives from './AddDirectives';
import huntDetails from './HuntDetails';
import styles from './styles';

class DirectiveListOrganizer extends Component {

  state = { directives: [], directive: {} }; //initial or empty state, property of this

  componentWillMount (){

    const url = 'https://treasure-chest-api.herokuapp.com/directives/find/' + this.props.hunt.id

    axios.get(url).then( response => {
      console.log("response from directivelist", response)
      return this.setState( { directives: response.data })
     })
      .catch(function (error) {
        console.log(error);
      });;
  }

  deleteDirectivePressed(directive){
  //delete the directive from the backend
    const url = 'https://treasure-chest-api.herokuapp.com/directives/' + directive.id
    console.log(url)
    axios.delete(url)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  //fetch the new directives list and change the state to reflect the deletiion
    const url2 = 'https://treasure-chest-api.herokuapp.com/directives/find/' + this.props.hunt.id

    axios.get(url2).then( response => {
      console.log("response from directivelist", response)
      return this.setState( { directives: response.data })
     })
      .catch(function (error) {
        console.log(error);
      });;
  }

//navigate to form to add more directives
  _toAddMoreDirectives = () => {
    this.props.navigator.push({
      title: 'Add Directives',
      component: addDirectives,
      passProps: { hunt: this.props.hunt,
                  user: this.props.user }
    });
  }

//navigate back to HuntDetails
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

//helper functions to render things
  renderDirectives() {

    if (this.state.directives.length > 0)  {

      return this.state.directives.map(directive =>
        <View style={styles.directivebox}>

          <Text style={styles.listitemsmallO} key={ directive.id } directive={directive}>
             {directive.name}
          </Text>

          <TouchableOpacity style={styles.x} onPress={() => this.deleteDirectivePressed(directive)}>
            <Text>✘</Text>
          </TouchableOpacity>

        </View>
        );
    }
  }

  render() {

    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() =>
        this.seeHuntPressed()}>
          <Text style={styles.huntname}> { this.props.hunt.name } </Text>
        </TouchableOpacity>

        <Text style={styles.submissionssmalltext}> Directives </Text>

        <View style={styles.smush}>
        <ScrollView style={styles.scrollviewdirective}>
          { this.renderDirectives() }
        </ScrollView>
      </View>

        <Button style={styles.addbutton} onPress={this._toAddMoreDirectives.bind(this)}> Add Directives </Button>

       </View>
    );
  }
}

export default DirectiveListOrganizer;
