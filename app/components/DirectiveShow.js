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

  checkCompletion(){
    if (this.props.directive.complete == false){
      console.log(">>>> Check completion called")
       return <Text> ✗ </Text>
    }

    return <Text> ✔︎ </Text>
  }

  render(){


    console.log("showing directive description")
    console.log ("this.props.directive", this.props.directive)
    return (
      <View>
        <Text style={styles.text}>Details about the directive you just clicked on.</Text>

          <Text>Name: {this.props.directive.name}</Text>

          <Text>Description: {this.props.directive.description}</Text>

          <Text>Complete:{this.checkCompletion()}</Text>

          <Text>Point Value: {this.props.directive.point_value}</Text>

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
