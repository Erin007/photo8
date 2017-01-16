import firebase from 'firebase';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

import Button from './common/Button';
import LoginForm from './LoginForm';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Spinner from './common/Spinner';
import newHunt from './MakeHuntForm';
import findHunt from './HuntFinder';

class welcome extends Component {
  state = { loggedIn: null }; //are you logged in?

  componentWillMount(){
    firebase.initializeApp({
    apiKey: 'AIzaSyDZrPj54Bk9o1h47dwAijBTKZjBWYt3At0',
    authDomain: 'hunt-cec80.firebaseapp.com',
    databaseURL: 'https://hunt-cec80.firebaseio.com',
    storageBucket: 'hunt-cec80.appspot.com',
    messagingSenderId: '348722860624'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  newHuntPressed() {
    console.log('>>> Make New Hunt Button Pressed!');
    this._toMakeHunt();
  }

  _toMakeHunt = () => {
    this.props.navigator.push({
      title: 'Make New Hunt',
      component: newHunt
    });
  }

  joinHuntPressed() {
    console.log('>>> Join Hunt Button Pressed!');
    this._toJoinHunt();
  }

  _toJoinHunt = () => {
    this.props.navigator.push({
      title: 'Join Hunt',
      component: findHunt
    });
  }

  renderContent(){
    switch (this.state.loggedIn) {
      //if the user is logged in
      case true:
        return (
        <View>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>

            <Button onPress={this.newHuntPressed.bind(this)}> Make a New Hunt </Button>

            <Button onPress={this.joinHuntPressed.bind(this)}> Join a Hunt </Button>

        </View>
      );
      //if the user is not logged in
      case false:
        return <LoginForm/>;
      //if we don't know yet whether the user is logged in or not
      default:
        return <Spinner/>;
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
           Snapenger Hunt
        </Text>

        {this.renderContent()}

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
  welcome: {
    fontSize: 45,
    textAlign: 'center',
    margin: 10,
    paddingTop: 10,
    fontFamily: 'Pacifico',
    justifyContent: 'flex-start'
  },
});

export default welcome;
