import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Text,
Image } from 'react-native';
import Button from './common/Button';
import Example from '../Camera';
import Card from './common/Button';

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
       return <Text> ❏ </Text>
    }
    return <Text> ✔︎ </Text>
  }

  renderPhoto(){
    console.log(">>>> Render Photo called")
    console.log(this.props.directive.complete)
    if (this.props.directive.complete == true){
      return <Text> This is where the photo will go</Text>
    }
    return(
      <View>
        <Text style={styles.text}> No Photo Submitted Yet </Text>
        <Image
        source={require('../assets/placeholder.png')}
        style={styles.placeholder}
        />
    </View>
    )
  }

  render(){

    console.log("showing directive description")
    console.log ("this.props.directive", this.props.directive)
    return (
      <View style={styles.container}>
        <Text style={styles.name}> {this.checkCompletion()}{this.props.directive.name}
        </Text>

        <Text style={styles.text}>Worth {this.props.directive.point_value} point(s)</Text>

        <Text>{this.props.directive.description}</Text>

        { this.renderPhoto() }

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
    fontSize: 16,
    textAlign: 'center',
    // margin: 15,
    paddingTop: 10
  },
  name: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "Chalkboard SE"
  },
  placeholder: {
    margin: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#21b6cb',
  },
});

export default DirectiveShow;
