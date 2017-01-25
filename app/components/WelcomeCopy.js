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

class welcomeCopy extends Component {
  state = { loggedIn: null, userId: '', username: '', user: '', email: '' }; //are you logged in?

  componentWillMount(){
    // firebase.initializeApp({
    // apiKey: 'AIzaSyDZrPj54Bk9o1h47dwAijBTKZjBWYt3At0',
    // authDomain: 'hunt-cec80.firebaseapp.com',
    // databaseURL: 'https://hunt-cec80.firebaseio.com',
    // storageBucket: 'hunt-cec80.appspot.com',
    // messagingSenderId: '348722860624'
    // });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("<<<<USER:", user)
        console.log("user.uid:", user.uid)
        console.log("user.email:", user.email)

        this.setState({ loggedIn: true, userId: user.uid, email: user.email});

        this.verifyUserWithBackend()
      } else {
        this.setState({ loggedIn: false, user: '' });
      }
    });
  }

  verifyUserWithBackend(){
    //see if that user already exists by searching for a user with that uid
    console.log('verifying user with backend function called')
    //Once the user is logged in, axios find-user-by-firebase get
    console.log(this.state.userId)
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
    console.log('<<< checkForUser called')
    console.log(this.state.user)
    console.log(this.state.user.length)
    console.log(this.state.user.length !== 0)

    if(this.state.user.length !== 0){
      this.userFound()
      return
    }
    //if the API doesn't find a user
    this.userNotFound()
  }

  userFound(){
    console.log('a user was found!')
    //if a user is returned, check for their username
    console.log(this.state.user.username)
    this.setState( { username: this.state.user.username })
    this.renderUsername()
  }

  makeUser() {
    console.log('>>> Make User called!');

    //send the information to the API to make a new user
    console.log(this.state.email)
    console.log(this.state.userId)

    axios.post('https://treasure-chest-api.herokuapp.com/users',{
      username: '',
      email: this.state.email,
      firebase: this.state.userId
    })
    .then(response => {
      console.log("response", response)
      return this.setState( { user: response.data })
    })
      //if the user is saved successfully
    .then(this.userSaved.bind(this))
    //if there was a problem saving the hunt
    .catch((error) => {
      console.log("The user did not save")

      this.setState({ error: "There was an error with your information. Please try again.", loading: false })

      console.log("Error:", error)
    });
  }

  userSaved(){
    console.log("the user was saved")
    console.log(this.state.user)
  }

  renderUsername(){
    console.log('rendering username')
  
    if (typeof this.state.user !== 'undefined' ){
      if (this.state.user.username !== ''){
        return (
          <Text style={styles.smalltext}> Welcome, {this.state.user.username}! </Text>
        )
      }
    }
  }

  userNotFound(){
    console.log('a user was not found')
    //if a user is not returned, make one
      this.makeUser()
  }

  signOut(){
    this.setState({ user: ''})
    firebase.auth().signOut()
  }

  profilePressed(){
    console.log('<<< Profile was pressed')
    this._toProfile();
  }

  _toProfile = () => {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: { user: this.state.user},
    });
  }

  organizePressed(){
    console.log('>>> Organize Pressed')
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
    console.log('>>> Play Pressed')
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
    backgroundColor: '#F5FCFF',
    marginTop: 40
  },
  scrollview:{
    marginTop: -10,
    height: 200
  },
  content:{
    marginTop: 25,
  },
  welcome: {
    fontSize: 42,
    textAlign: 'center',
    margin: 10,
    paddingTop: 10,
    fontFamily: 'Pacifico',
  },
  smalltext: {
    fontSize: 25,
    textAlign: 'left',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -20,
    fontFamily: 'Chalkboard SE'
  },
  smallertext: {
    fontSize: 14,
    textAlign: 'left',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -50,
    fontFamily: 'Chalkboard SE'
  },
});

export default welcomeCopy;
