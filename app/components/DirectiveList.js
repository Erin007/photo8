//DirectiveList.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text } from 'react-native';
import axios from 'axios';
//import DirectiveDetail from './DirectiveDetail';
import DirectiveShow from './DirectiveShow'

class DirectiveList extends Component {

    state = { directives: [], directive: {} }; //initial or empty state, property of this

    componentWillMount (){
      //change this to send the url of the specific hunt once everything is working!
      axios.get('https://treasure-chest-api.herokuapp.com/').then( response => {
        return this.setState( { directives: response.data.directives })
       })
        .catch(function (error) {
          console.log(error);
        });;
    }

    directiveShowPressed(directive) {
      console.log('>>> Directive Detail Pressed!');
      console.log("this.state", this.state)
      this._toDirectiveShow(directive);
    }

    _toDirectiveShow = (directive) => {
      this.props.navigator.push({
        title: 'Directive',
        component: DirectiveShow,
        passProps: { directive: directive}
      });
    }

    renderDirectives() {
      if (typeof this.state.directives[0] !== 'undefined')  {

        return this.state.directives.map(directive =>

          <TouchableOpacity onPress={() => this.directiveShowPressed(directive)} key={ directive.id } directive={directive}>

            <Text style={styles.directive}>
               ❏  {directive.name}
            </Text>
          </TouchableOpacity>
          );
      }
    }

    render() {
      console.log('this.state from DirectiveList render', this.state);

      return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.text}>Ada: Explore Seattle </Text>
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
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    //margin: 5,
    marginTop: 55,
    paddingTop: 20,
    fontFamily: 'Pacifico'
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
    paddingLeft: 10
  }
});

export default DirectiveList;
