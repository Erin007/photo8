//DirectiveList.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Text } from 'react-native';
import axios from 'axios';
import DirectiveDetail from './DirectiveDetail';

class DirectiveList extends Component {

    state = { directives: [] }; //initial or empty state, property of this
    //this.state.directives would return an empty array

    componentWillMount (){
      //console.log('component will mount in directive list')
      //console.log('this.state.directives', this.state.directives)

      //change this to send the url of the specific hunt once everything is working!
      axios.get('https://treasure-chest-api.herokuapp.com/').then( response => {
        console.log("beep", response.data);
        return this.setState( { directives: response.data.directives })
       })
        .catch(function (error) {
          console.log(error);
        });;
    }

    renderDirectives() {
      console.log('renderingDirectives() in DirectiveList');
      console.log('this.state.directives', this.state.directives);
      console.log('this.state.directives[0]', this.state.directives[0]);

      if (typeof this.state.directives[0] !== 'undefined')  {
        // console.log('this.state.directives[0].name', this.state.directives[0].name)
        return this.state.directives.map(directive =>
          <DirectiveDetail key={ directive.id } directive = {directive} />);
          // <Text style={styles.text}> {directive.name} </Text>);
      }
    }
    // <ScrollView>
    //   { this.renderDirectives() }
    // </ScrollView>
    // <View style={styles.container}>
    //   <Text style={styles.text}>
    //     This is where the directives should show up.
    //   </Text>
    //  </View>
    render() {
      console.log('this.state from DirectiveList render', this.state);

      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            This is where the directives should show up.
          </Text>

          <ScrollView>
            { this.renderDirectives() }
          </ScrollView>
         </View>

      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    marginTop: 50,
    paddingTop: 10
  },
});

export default DirectiveList;
