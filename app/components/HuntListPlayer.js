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

class HuntListPlayer extends Component {
  joinHuntPressed() {
    console.log('>>> Join Hunt Button Pressed!');
    this.setState( { username: '' })
    this._toJoinHunt();
  }

  _toJoinHunt = () => {
    this.props.navigator.push({
      title: 'Join Hunt',
      component: findHunt,
      passProps: { user: this.state.user[0]},
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
           HuntListPlayer
        </Text>
        <Button>Join a New Hunt</Button>
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

export default HuntListPlayer;
