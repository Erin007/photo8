import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Button from './common/Button';
import DirectiveList from './DirectiveList';
import newHunt from './MakeHuntForm';

class huntDetails extends Component{

  showLogs(){
    console.log(this.props)
  }

  joinHuntPressed() {
    console.log('>>> Join Hunt Button Pressed!');
    this._toDirectiveList();
  }

  _toDirectiveList = () => {
    this.props.navigator.push({
      title: 'Hunt',
      component: DirectiveList
    });
  }

  anotherHuntPressed(){
    console.log('>>> Make Another Hunt Button Pressed!');
    this._toMakeHunt();
  }

  _toMakeHunt = () => {
    this.props.navigator.push({
      title: 'New Hunt',
      component: newHunt
    });
  }


  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
           You have successfully created a hunt. Please share the hunt name and passcode with players.
        </Text>
        {this.showLogs()}
        <Text> Name : { this.props.hunt.name } </Text>
        <Text> Passcode: { this.props.hunt.passcode }</Text>

        <Button onPress={this.joinHuntPressed.bind(this)}> Join Hunt </Button>

        <Button onPress={this.anotherHuntPressed.bind(this)}> Make Another Hunt </Button>

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
    margin: 10,
    paddingTop: 10
  },
});

export default huntDetails;
