import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import DirectiveList from './DirectiveList';
import Button from './common/Button';
import Input from './common/Input';
import Card from './common/Card';
//import CardSection from './common/CardSection';

class findHunt extends Component{

  goHuntingPressed() {
    console.log('>>> Go Hunting Button Pressed!');
    //this needs to be conditionally on the successful save of the new hunt to the api, the api will have to send some signal letting the mobile app know it's been successful
    this._toDirectiveList();
  }

  _toDirectiveList = () => {
    this.props.navigator.push({
      title: 'Hunt',
      component: DirectiveList
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
           This is where users will enter the hunt id and passcode for a hunt!
        </Text>



        <Button onPress={this.goHuntingPressed.bind(this)}>Find</Button>
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
