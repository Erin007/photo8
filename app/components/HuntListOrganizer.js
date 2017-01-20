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
        <Text style={styles.text}>
           HuntListOrganizer
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
    marginTop: 65
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
