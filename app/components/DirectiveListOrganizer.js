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
import DirectiveShowOrganizer from './DirectiveShowOrganizer';
import addDirectives from './AddDirectives';
import huntDetails from './HuntDetails';

class DirectiveListOrganizer extends Component {

  state = { directives: [], directive: {} }; //initial or empty state, property of this

  componentWillMount (){
    console.log('Component will Mount in DirectiveList called')

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
    console.log("delete directive pressed.")
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
    console.log('seeHunt pressed');
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
    console.log('<<<Render Directives Called')
    console.log('this.state.directives', this.state.directives)

    if (this.state.directives.length > 0)  {

      return this.state.directives.map(directive =>
        <View style={styles.directivebox}>

          <Text style={styles.directive} key={ directive.id } directive={directive}>
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
        <Text style={styles.text}> { this.props.hunt.name } </Text>
      </TouchableOpacity>

      <Text style={styles.smalltext}> Directives </Text>

      <ScrollView style={styles.scrollview}>

        { this.renderDirectives() }

      </ScrollView>

        <Button style={styles.button} onPress={this._toAddMoreDirectives.bind(this)}> Add Directives </Button>

       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 35,
    paddingBottom: 20
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 10,
    fontFamily: 'Pacifico'
  },
  smalltext: {
    fontSize: 25,
    textAlign: 'left',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE'
  },
  directive:{
    fontSize: 16,
    fontFamily: 'Chalkboard SE',
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
    width: 245
  },
  x:{
    width: 30,
    height: 30,
    backgroundColor: "#21b6cb",
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#167c89',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor:'#167c89',
    marginTop: 12,
  },
  directivebox: {
    flexDirection: 'row',
    marginBottom: 5,
    width: 300
  },
  scrollview: {
    marginTop: 10,
    marginBottom: 15,
    height: 300
  }
});

export default DirectiveListOrganizer;
