import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Text } from 'react-native';
import Button from './common/Button';
import Example from '../Camera'

class DirectiveShow extends Component {

  takePhotoPressed() {
    console.log('>>> Take Photo Pressed');
    this._toCamera();
  }

  _toCamera = () => {
    this.props.navigator.push({
      title: 'Camera',
      component: Example
      //passProps: { directive: {directive} },
    });
  }


  render(){
    console.log("showing directive description")
    //console.log("directive", directive)
    console.log("this.props", this.props)
    //console.log("this.directive", this.directive )
    console.log ("this.props.route.directive", this.props.route.directives)
    return (
      <View>
        <Text style={styles.text}>Details about the directive you just clicked on.</Text>

        <Button onPress={this.takePhotoPressed.bind(this)}>Take Photo</Button>
      </View>
    )
  }
};

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
