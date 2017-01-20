//HuntListOrganizer.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  SideMenu,
  ScrollView
} from 'react-native';
import Button from './common/Button';
import newHunt from './MakeHuntForm';

class HuntListOrganizer extends Component {

  newHuntPressed() {
    console.log('>>> Make New Hunt Button Pressed!');
    this._toMakeHunt();
  }

  _toMakeHunt = () => {
    this.props.navigator.push({
      title: 'Make New Hunt',
      component: newHunt,
      passProps: { user: this.props.user},
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
           Snapenger Hunt
        </Text>
        <Text style={styles.text}>
           Hunts You Organize
        </Text>
        <Button onPress={ this.newHuntPressed.bind(this)}>Make a New Hunt</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    paddingTop: 10,
    fontFamily: 'Pacifico',
    justifyContent: 'flex-start'
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE'
  },
});


export default HuntListOrganizer;
