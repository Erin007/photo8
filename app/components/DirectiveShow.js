//DirectiveShow.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
Image } from 'react-native';
import Button from './common/Button';
import Input from './common/Input';
import Example from '../Camera';
import Card from './common/Button';
import axios from 'axios';

class DirectiveShow extends Component {

  state = { caption: '', error: '', loading: false, submission: {}}

  toCameraPressed() {
    console.log('>>> To Camera Pressed');
    this._toCamera();
  }

  saveCaptionPressed(){
    console.log('>>> Save caption pressed')

    //axios post this caption to the submission with the directive_id passed in props
    axios.post('https://treasure-chest-api.herokuapp.com/submissions',{
      directive_id: this.props.directive.id,
      caption: this.state.caption,
      //team_id: "Whatever team this player is on right now"
    })
    .then(response => {
      console.log("response", response)
      return this.setState( { submission: response.data })
    })
      //if the submission is saved successfully
    .then(this.submissionSaved.bind(this))
    //if there was a problem saving the submission
    .catch((error) => {
      console.log("The submission caption did not save")

      this.setState({ error: "There was an error with your submission. Please try again.", loading: false })

      console.log("Error:", error)
    });
  }

  submissionSaved(){
    console.log("made it to submissionSaved");
    //clear the form
    this.setState({
      caption:'',
      loading: false,
      error: ''
    })

    //call renderCaption
    console.log(this.state.submission.caption);
    this.renderCaption()
  }

  renderCaption(){
    if (typeof this.state.submission.caption !== 'undefined'){
      //if there is a caption, show it on the screen
      return(
        <Text style={styles.captiontext}> {this.state.submission.caption} </Text>
      )
    }
    //if there isn't a caption, then show the input box and save caption button
    return(
      <View style={styles.caption}>
        <Input
          label = ""
          placeholder = "caption"
          value = {this.state.caption}
          onChangeText = {caption => this.setState({ caption })}
          />

          <Button onPress={this.saveCaptionPressed.bind(this)}>Save Caption</Button>
      </View>
    )
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
        <Image
        source={require('../assets/placeholder.png')}
        style={styles.placeholder}
        />
    </View>
    )
  }

  renderCameraIcon(){
    console.log('<<< Render CameraIcon called')
      if (this.props.directive.complete !== true){
        return(
          <View>
            <TouchableOpacity onPress={this.toCameraPressed.bind(this)}>
              <Image
              source={require('../assets/ic_photo_camera_36pt.png')}
              style={styles.camerabutton}
              />
            </TouchableOpacity>
          </View>
        )
      }
  }

  render(){

    console.log("showing directive description")
    console.log ("this.props.directive", this.props.directive)
    return (
      <View style={styles.container}>
        <Text style={styles.name}> {this.checkCompletion()}{this.props.directive.name}
        </Text>

        <Text>{this.props.directive.description}</Text>

        { this.renderPhoto() }
        { this.renderCameraIcon() }
        { this.renderCaption() }

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
    marginTop: 85
  },
  caption: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  captiontext:{
    // marginTop: -5,
    fontSize: 16,
    textAlign: 'center',
    // margin: 15,
    paddingTop: 10
  },
  camerabutton:{
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 10
  },
  name: {
    fontSize: 18,
    textAlign: 'center',
    // marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 15,
    fontFamily: "Chalkboard SE"
  },
  placeholder: {
    margin: 10,
    height: 250,
    width: 250,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#21b6cb',
  },
});

export default DirectiveShow;
