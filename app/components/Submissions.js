//Submissions.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import Button from './common/Button';

class Submissions extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>This is where the player will be able to see all of the submissions for this hunt. </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    backgroundColor: '#F5FCFF',
  },
})

export default Submissions;
