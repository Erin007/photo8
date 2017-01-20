//HuntListPlayer.js

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
import findHunt from './HuntFinder';

class HuntListPlayer extends Component {
  joinHuntPressed() {
    console.log('>>> Join Hunt Button Pressed!');
    this._toJoinHunt();
  }

  _toJoinHunt = () => {
    this.props.navigator.push({
      title: 'Join Hunt',
      component: findHunt,
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
           Hunts You Play
        </Text>
        <Button onPress={this.joinHuntPressed.bind(this)}>Join a New Hunt</Button>
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

export default HuntListPlayer;
