//HuntListOrganizer.js

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
import newHunt from './MakeHuntForm';
import huntDetails from './HuntDetails';
import axios from 'axios';
import welcomeCopy from './WelcomeCopy';

class HuntListOrganizer extends Component {

  state = { hunts: [], hunt: {}, user: this.props.user };

  componentWillMount (){

    const url = 'https://treasure-chest-api.herokuapp.com/hunts/find/organizer/' + this.props.user.id

    axios.get(url).then( response => {
      console.log("response from HuntListOrganizer", response)
      return this.setState( { hunts: response.data })
     })
      .catch(function (error) {
        console.log(error);
      });;
  }

  huntShowPressed(hunt){
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

  renderHunts() {

    if (this.state.hunts.length > 0)  {

      return this.state.hunts.map(hunt =>

        <TouchableOpacity onPress={() => this.huntShowPressed(hunt)} key={ hunt.id } hunt={hunt}>
          <Text style={styles.hunt}>
              {hunt.name}
          </Text>
        </TouchableOpacity>
      );
    }
    return <Text style={styles.smallertext}> You are not organizing any hunts </Text>
  }

  newHuntPressed() {
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

        <TouchableOpacity onPress={this.toHome.bind(this)}>
          <Text style={styles.welcome}>
             Snapenger Hunt
          </Text>
        </TouchableOpacity>

        <Text style={styles.text}>
           Hunts You Organize
        </Text>

        <ScrollView style={styles.scrollview}>
          { this.renderHunts() }
        </ScrollView>

        <Button onPress={ this.newHuntPressed.bind(this)}>Make a New Hunt</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#cce5e5',
    marginTop: 40,
    paddingBottom: 60
  },
  welcome: {
    fontSize: 42,
    textAlign: 'center',
    margin: 5,
    padding: 5,
    fontFamily: 'Pacifico',
    color: '#006666',
    textShadowColor: '#003333',
    textShadowOffset:( {width: 1, height: 1} ),
    textShadowRadius: 1
  },
  text: {
    fontSize: 25,
    textAlign: 'left',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
  },
  hunt:{
    fontSize: 20,
    fontFamily: 'Chalkboard SE',
    textAlign: 'left',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#4ca6a6',
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
    width: 275,
    backgroundColor: 'white',
    color:  '#353839',
  },
  smallertext: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
  },
  scrollview:{
    height: 250,
    marginBottom: 10,
  }
});


export default HuntListOrganizer;
