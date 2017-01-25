//HuntListPlayer.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  SideMenu,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Button from './common/Button';
import findHunt from './HuntFinder';
import huntDetails from './HuntDetails';
import axios from 'axios';
import welcomeCopy from './WelcomeCopy';

class HuntListPlayer extends Component {

  state = { hunts: [], hunt: {}, user: this.props.user };

  componentWillMount(){
    console.log("huntListPlayer", this.props.user )
    const url = 'https://treasure-chest-api.herokuapp.com/hunts/find/player/' + this.props.user.id

    axios.get(url).then( response => {
      console.log("response from HuntListPlayer", response)
      return this.setState( { hunts: response.data })
     })
      .catch(function (error) {
        console.log(error);
      });;
  }

  renderHunts(){
    console.log(this.state.hunts)
    if (this.state.hunts.length > 0) {
      return this.state.hunts.map(hunt =>

        <TouchableOpacity onPress={() => this.huntShowPressed(hunt)} key={ hunt.id } hunt={hunt}>

          <Text style={styles.hunt}>
              {hunt.name}
          </Text>
        </TouchableOpacity>
        );
    }
    return <Text style={styles.smallertext}> You are not participating in any hunts </Text>
  }

  huntShowPressed(hunt){
    console.log("huntShowPressed")
    this._toHuntShow(hunt);
  }

  _toHuntShow = (hunt) => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails,
      passProps: { hunt: hunt,
                   user: this.state.user }
    });
  }

//navigate the user to the 'home' page
  toHome(){
    console.log('The user wants to go home');
    this._toHome();
  }

  _toHome = () => {
    this.props.navigator.push({
      title: 'Home',
      component: welcomeCopy,
      passProps: { hunt : this.props.hunt,
                   user : this.props.user}
    });
  }

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

        <TouchableOpacity onPress={this.toHome.bind(this)}>
          <Text style={styles.welcome}>
             Snapenger Hunt
          </Text>
        </TouchableOpacity>

        <Text style={styles.text}>
           Hunts You Play
        </Text>

        <ScrollView style={styles.scrollview}>
          {this.renderHunts()}
        </ScrollView>

        <Button onPress={this.joinHuntPressed.bind(this)}>Join a New Hunt</Button>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'F5FCFF',
    marginTop: 40,
    paddingBottom: 40
  },
  welcome: {
    fontSize: 42,
    textAlign: 'center',
    margin: 10,
    paddingTop: 10,
    fontFamily: 'Pacifico',
  },
  text: {
    fontSize: 25,
    textAlign: 'left',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE'
  },
  hunt:{
    fontSize: 20,
    fontFamily: 'Chalkboard SE',
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 15,
    width: 275
  },
  smallertext: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Chalkboard SE',
    color: '#DCDCDC',
  },
  scrollview: {
    marginBottom: 10,
    height: 300,
    marginTop: -45
  }
});

export default HuntListPlayer;
