import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Button from './common/Button';
import huntDetails from './ShareHunt';
import directiveList from './DirectiveList'

class newHunt extends Component{
  savePressed() {
    console.log('>>> Save Button Pressed!');
    this._toShareHunt();
  }

  _toShareHunt = () => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
           This is where there will be a form for users to make a new hunt!
        </Text>
        <Button onPress={this.savePressed.bind(this)}> Save </Button>
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

export default newHunt;
