import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Text } from 'react-native';


class DirectiveShow extends Component {

  render() {

    return (
      <View style={styles.container}>
        <Text>
          This is where there will be details about the directive you just clicked on.
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
    margin: 20,
    marginTop: 50,
    paddingTop: 10
  },
});

export default DirectiveShow;
