import firebase from 'firebase';
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
import LoginForm from './LoginForm';
import Spinner from './common/Spinner';
import Input from './common/Input';
import newHunt from './MakeHuntForm';
import findHunt from './HuntFinder';
import Profile from './Profile';
import HuntListOrganizer from './HuntListOrganizer';
import HuntListPlayer from './HuntListPlayer';
import axios from 'axios';

class welcome extends Component {
  state = { loggedIn: null, userId: '', username: '', user: '', email: '' };

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

        this.setState({ loggedIn: true, userId: user.uid, email: user.email});

        this.verifyUserWithBackend()
      } else {
        this.setState({ loggedIn: false, user: '' });
      }
    });
  }

  verifyUserWithBackend(){
    //see if that user already exists by searching for a user with that firebase uid
    const url = 'https://treasure-chest-api.herokuapp.com/users/find/firebase/' + this.state.userId

    axios.get(url).then( response => {
      console.log("response", response)

      this.setState( { user: response.data })
      console.log('this.state.user', this.state.user)

      this.checkForUser()
      })
      .catch(function (error) {
        console.log(error);
      });;
  }

  checkForUser(){

    if(this.state.user.length !== 0){
      this.userFound()
      return
    }
    //if the API doesn't find a user
    this.userNotFound()
  }

  userFound(){
    //if a user is returned, check for their username
    this.setState( { username: this.state.user.username })
    this.renderUsername()
  }

  makeUser() {
    //send the information to the API to make a new user
    axios.post('https://treasure-chest-api.herokuapp.com/users',{
      username: '',
      email: this.state.email,
      firebase: this.state.userId
    })
    .then(response => {
      console.log("response", response)
      return this.setState( { user: response.data })
    })
    //if there was a problem saving the user
    .catch((error) => {
      console.log("The user did not save")

      this.setState({ error: "There was an error with your information. Please try again.", loading: false })

      console.log("Error:", error)
    });
  }

  renderUsername(){

    if (typeof this.state.user !== 'undefined' ){
      if (this.state.user.username !== ''){
        return (
          <Text style={styles.smalltext}> Welcome, {this.state.user.username}! </Text>
        )
      }
    }
  }

  userNotFound(){
    //if a user is not returned, make one
      this.makeUser()
  }

  signOut(){
    this.setState({ user: ''})
    firebase.auth().signOut()
  }

  profilePressed(){
    this._toProfile();
  }

  _toProfile = () => {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: { user: this.state.user,
                   player: this.state.user},
    });
  }

  organizePressed(){
    this._toHuntListOrganizer();
  }

  _toHuntListOrganizer = () => {
    this.props.navigator.push({
      title: 'Organize Hunts',
      component: HuntListOrganizer,
      passProps: { user: this.state.user}
    })
  }

  playPressed(){
    this._toHuntListPlayer();
  }

  _toHuntListPlayer = () => {
    this.props.navigator.push({
      title: 'Play',
      component: HuntListPlayer,
      passProps: { user: this.state.user}
    })
  }

  renderContent(){
    switch (this.state.loggedIn) {
      //if the user is logged in
      case true:
        return (
        <View style={styles.content}>

            { this.renderUsername() }

          <ScrollView style={styles.scrollview}>

            <Button onPress={this.playPressed.bind(this)}> Play </Button>

            <Button style={{margin:0}} onPress={this.organizePressed.bind(this)}> Organize </Button>

            <Button onPress={this.profilePressed.bind(this)}> Profile </Button>

            <Button onPress={() => this.signOut()}>  Log Out </Button>

          </ScrollView>

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

        { this.renderContent()  }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#cce5e5',
    marginTop: 40
  },
  scrollview:{
    height: 200
  },
  content:{
    marginTop: 25,
  },
  welcome: {
    fontSize: 42,
    textAlign: 'center',
    fontFamily: 'Pacifico',
    margin: 5,
    padding: 5,
    marginBottom: 30,
    color: '#006666',
    textShadowColor: 'white',
    textShadowOffset:( {width: 1, height: 1} ),
    textShadowRadius: 1
  },
  smalltext: {
    fontSize: 25,
    textAlign: 'left',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -20,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
  },
  smallertext: {
    fontSize: 14,
    textAlign: 'left',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -50,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
  },
});

export default welcome;
