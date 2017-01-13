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
import DirectiveShow from './DirectiveShow';

class DirectiveList extends Component {

    state = { directives: [] }; //initial or empty state, property of this

    componentWillMount (){

      //change this to send the url of the specific hunt once everything is working!
      axios.get('https://treasure-chest-api.herokuapp.com/').then( response => {
        return this.setState( { directives: response.data.directives })
       })
        .catch(function (error) {
          console.log(error);
        });;
    }

    directiveShowPressed() {
      console.log('>>> Directive Detail Pressed!');
      this._toDirectiveShow();
    }

    _toDirectiveShow = () => {
      this.props.navigator.push({
        title: 'Directive',
        component: DirectiveShow
      });
    }

    renderDirectives() {
      if (typeof this.state.directives[0] !== 'undefined')  {

        return this.state.directives.map(directive =>
          <DirectiveDetail onPress={this.directiveShowPressed.bind(this)} key={ directive.id } directive={directive} />);
      }
    }

    render() {
      console.log('this.state from DirectiveList render', this.state);

      return (
        <View style={styles.container}>
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
    backgroundColor: '#F5FCFF',
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
