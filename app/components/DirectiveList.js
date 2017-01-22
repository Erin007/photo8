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
import huntDetails from './HuntDetails';

class DirectiveList extends Component {

    state = { directives: [], directive: {} };

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
        passProps: { directive: directive,
                     hunt: this.props.hunt,
                     user: this.props.user}
      });
    }

    renderDirectives() {
      console.log('<<<Render Directives Called')
      console.log('this.state.directives', this.state.directives)
      //console.log('this.state.directives.length', this.state.directives.directives.length)
      if (this.state.directives.length > 0)  {

        return this.state.directives.map(directive =>

          <TouchableOpacity onPress={() => this.directiveShowPressed(directive)} key={ directive.id } directive={directive}>

            <Text style={styles.directive}>
               ❏  {directive.name}
            </Text>
          </TouchableOpacity>
          );
      }
    }

    _toHuntDetails = (hunt) => {
      this.props.navigator.push({
        title: 'Hunt Details',
        component: huntDetails,
        passProps: { hunt: this.props.hunt,
                     user: this.state.user }
      });
    }

    render() {
      console.log('this.state from DirectiveList render', this.state);
      console.log('this.props', this.props)

      return (
        <View style={styles.container}>

          <ScrollView>

            <TouchableOpacity onPress={this._toHuntDetails.bind(this)}>
              <Text style={styles.text}> { this.props.hunt.name } </Text>
            </TouchableOpacity>

            <Text style={styles.smalltext}> { this.props.hunt.description } </Text>

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
    // marginTop: 65,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 20,
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
    paddingLeft: 10
  }
});

export default DirectiveList;
