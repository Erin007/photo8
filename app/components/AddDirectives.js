//AddDirective.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import DirectiveList from './DirectiveList';
import Button from './common/Button';
import Input from './common/Input';
import Spinner from './common/Spinner';
import Card from './common/Card';
import CardSection from './common/CardSection';
import huntDetails from './HuntDetails';

class addDirectives extends Component{
  state = { directive: '', organizerId:'', error: '', loading: false}

  seeHuntPressed(huntId) {
    console.log('>>> See Hunt pressed');
    console.log("this.props", this.props)
    console.log("huntId", huntId)
    this._toHuntDetails(huntId)
  }

  _toHuntDetails = (huntId) => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails,
      passProps: { huntId: huntId}
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <CardSection>
          <Input
            label = "Directive:"
            placeholder = "your group at the Space Needle"
            //secureTextEntry
            value = {this.state.directive}
            //What I need to do here is add the directive to the backend with the hunt_id set for the current hunt and then render the directives already associated with the hunt below the form so the user knows what they have already entered
            //maybe also a counter of how many directives are already attached to the hunt?
            onChangeText = {directive => this.setState({ directive })}/>
        </CardSection>

        <CardSection>
          <Button onPress={() =>
            this.seeHuntPressed(this.props.huntId)}> See Hunt </Button>
        </CardSection>
      </View>
    )
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
    margin: 10,
    paddingTop: 10,
    fontFamily: 'Chalkboard SE'
  },
});

export default addDirectives;
