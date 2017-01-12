import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

class findHunt extends Component{
  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
           This is where users will enter the hunt id and passcode for a hunt!
        </Text>
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
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 10
  },
});

export default findHunt;
