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
import Card from './common/Card';
import CardSection from './common/CardSection';
import Spinner from './common/Spinner';
import Input from './common/Input';
import newHunt from './MakeHuntForm';
import findHunt from './HuntFinder';
import axios from 'axios';

class welcome extends Component {
  state = { loggedIn: null, userId: '', username: '', user: '', email: '' }; //are you logged in?

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
        console.log("<<<<USER:", user)
        console.log("user.uid:", user.uid)
        console.log("user.email:", user.email)

        this.setState({ loggedIn: true, userId: user.uid, email: user.email, username: ''});

        this.verifyUserWithBackend()
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  verifyUserWithBackend(){
    //see if that user already exists by searching for a user with that uid
    console.log('verifying user with backend function called')
    //Once the user is logged in, axios find-user-by-email get
    console.log(this.state.userId)
    const url = 'https://treasure-chest-api.herokuapp.com/user/find/' + this.state.userId

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
    console.log(this.state.user[0].username)
    this.setState( { username: this.state.user[0].username })
    this.renderUsername()
  }

  savePressed() {
    console.log('>>> Save Caption Pressed!');

    this.setState({ error: '', loading: true });

    //send the information to the API to make a new user
    console.log(this.state.username)
    console.log(this.state.email)
    console.log(this.state.userId)

    axios.post('https://treasure-chest-api.herokuapp.com/users',{
      username: this.state.username,
      email: this.state.email,
      firebase: this.state.userId
    })
    .then(response => {
      console.log("response", response)
      return this.setState( { user: response.data })
    })
      //if the user is saved successfully
    .then(this.userSaved())
    //if there was a problem saving the hunt
    .catch((error) => {
      console.log("The user did not save")

      this.setState({ error: "There was an error with your username. Please try again.", loading: false })

      console.log("Error:", error)
    });
  }

  userSaved(){
    console.log("the user was saved")
  }

  renderUsername(){
    console.log('welcoming the user')
    if (this.state.username !== ''){
      return (
        <Text style={styles.smalltext}> Welcome, {this.state.username}! </Text>
      )
    }
  }

  userNotFound(){
    console.log('a user was not found')
    //if a user is not returned, make one
      //ask them for a username
      this.makeUsername()
  }


    //if they have a username, store it in state and welcome them
    //if they don't have a username, render a text input box so they can make one
      //update the user in the backend with the new username

      //retrieve the updated user

  //store the user as state so it can be passed as props
  signOut(){
    this.setState( { username: '' })
    firebase.auth().signOut()
  }

  newHuntPressed() {
    console.log('>>> Make New Hunt Button Pressed!');
    this.setState( { username: '' })
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
    this.setState( { username: '' })
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
        <View style={styles.container}>

            { this.renderUsername() }
          <ScrollView>
            <Button onPress={() => this.signOut()}>
              Log Out
            </Button>

            <Button style={{margin:0}} onPress={this.newHuntPressed.bind(this)}> Make a New Hunt </Button>

            <Button onPress={this.joinHuntPressed.bind(this)}> Join a New Hunt </Button>

            <Button> See Your Hunts </Button>
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
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50
  },
  content:{
    marginTop: 20,
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    paddingTop: 10,
    fontFamily: 'Pacifico',
    justifyContent: 'flex-start'
  },
  smalltext: {
    fontSize: 18,
    textAlign: 'left',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -50,
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

export default welcome;
