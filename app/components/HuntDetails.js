import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Button from './common/Button';
import DirectiveList from './DirectiveList'

class huntDetails extends Component{

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
           This is where there will be a message that the hunt was successfully saved and the passcode and id for the hunt will be displayed to the organizer.
        </Text>
        
        <Button onPress={this.goHuntingPressed.bind(this)}> Go Hunting! </Button>
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

export default huntDetails;
