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

class HuntListOrganizer extends Component {

  state = { hunts: [], hunt: {}, user: this.props.user };

  componentWillMount (){
    console.log('componentWillMount HuntsListOrganizer')
    console.log( "HuntsListOrganizer props", this.props)
    //change this to send the url of the specific hunt once everything is working!
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

  renderHunts() {
    console.log('<<<renderHunts in HuntListOrganizer')
    console.log('this.state.hunts', this.state.hunts)

    if (this.state.hunts.length > 0)  {

      return this.state.hunts.map(hunt =>

        <TouchableOpacity onPress={() => this.huntShowPressed(hunt)} key={ hunt.id } hunt={hunt}>

          <Text style={styles.hunt}>
              {hunt.name}
          </Text>
        </TouchableOpacity>
        );
    }
  }

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

        { this.renderHunts() }

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
  hunt:{
    fontSize: 16,
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
    paddingLeft: 10,
    width: 275
  }
});


export default HuntListOrganizer;
