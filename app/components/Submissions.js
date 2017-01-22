//Submissions.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Button from './common/Button';
import huntDetails from './HuntDetails';

class Submissions extends Component{

//navigate to huntDetails
  seeHuntPressed() {
    console.log('seeHunt pressed');
    this._toHuntDetails()
  }

  _toHuntDetails = () => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails,
      passProps: { hunt: this.props.hunt,
                  user: this.props.user}
    });
  }

  render(){
    return(
      <View style={styles.container}>

      <TouchableOpacity onPress={() =>
        this.seeHuntPressed()}>
        <Text style={styles.name}>
          {this.props.hunt.name}
        </Text>
      </TouchableOpacity>

        <Text>This is where the player will be able to see all of the submissions for this hunt. </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    backgroundColor: '#F5FCFF',
  },
  name: {
    fontSize: 32,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Pacifico'
  },
})

export default Submissions;
