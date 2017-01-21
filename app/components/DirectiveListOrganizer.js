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
import DirectiveShow from './DirectiveShow'

class DirectiveList extends Component {

    state = { directives: [], directive: {} }; //initial or empty state, property of this

    componentWillMount (){
      console.log('Component will Mount in DirectiveList called')
      //change this to send the url of the specific hunt once everything is working!
      const url = 'https://treasure-chest-api.herokuapp.com/directives/find/' + this.props.hunt.id

      axios.get(url).then( response => {
        console.log("response from directivelist", response)
        return this.setState( { directives: response.data })
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

    deleteDirectivePressed(){
      console.log("delete directive pressed.")
    }

    renderDirectives() {
      console.log('<<<Render Directives Called')
      console.log('this.state.directives', this.state.directives)
      //console.log('this.state.directives.length', this.state.directives.directives.length)
      if (this.state.directives.length > 0)  {

        return this.state.directives.map(directive =>
          <View style={styles.directivebox}>

            <TouchableOpacity onPress={() => this.directiveShowPressed(directive)} key={ directive.id } directive={directive}>

              <Text style={styles.directive}>
                 ❏  {directive.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.x} onPress={() => this.deleteDirectivePressed(this.state.directive)}>
              <Text>✗</Text>
            </TouchableOpacity>

          </View>
          );
      }
    }

    render() {
      console.log('this.state from DirectiveList render', this.state);
      console.log('this.props', this.props)

      return (
        <View style={styles.container}>

          <Text style={styles.text}> { this.props.hunt.name } </Text>

          <ScrollView style={styles.scrollview}>

            { this.renderDirectives() }

          </ScrollView>

          <Button style={styles.button}> Add More Directives </Button>

         </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 55,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 10,
    fontFamily: 'Pacifico'
  },
  smalltext: {
    fontSize: 14,
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
    width: 250
  },
  x:{
    width: 30,
    height: 30,
    backgroundColor: "#21b6cb",
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#167c89',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor:'#167c89',
    marginTop: 15
  },
  directivebox: {
    flexDirection: 'row',
    marginBottom: 5,
    width: 300
  },
  scrollview: {
    marginTop: 10,
    marginBottom: 25,
    height: 300
  }
});

export default DirectiveList;
