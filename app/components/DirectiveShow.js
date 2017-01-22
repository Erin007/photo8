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
import axios from 'axios';
import addCaption from './AddCaption'

class DirectiveShow extends Component {

  state = { caption: '', error: '', loading: false, submission: {}, submissionId: ''}



  //check for submissions to this directive by this team

  //if a submission was found, render the photo and caption, and status of  that submission

  //if a submission wasn't found, make a new 'shell' submission so adding a caption and adding a photo can both be updates/put requests

  //navigate to the camera

  //navigate to add a caption
  updateCaptionPressed(){
    console.log("update caption was pressed")
    this._toAddCaption()
  }

  _toAddCaption = () => {
    this.props.navigator.push({
      title: 'Caption',
      component: addCaption,
      passProps: { user: this.props.user,
      directive: this.props.directive,
      hunt: this.props.hunt},
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
      <Text style={styles.text}> You have not yet submitted a caption.
      </Text>
    )
  }

  toCameraPressed() {
    console.log('>>> To Camera Pressed');
    this._toCamera();
  }

  _toCamera = () => {
    this.props.navigator.push({
      title: 'Camera',
      component: Example,
      passProps: { directive: this.props.directive},
    });
  }

  checkCompletion(){
    console.log('<<< Checking completion of directive in status show')
    console.log(this.props.directive)
    if (this.props.directive.complete == null || this.props.directive.complete == false ){
      console.log(">>>> Check completion called")
       return <Text> ❏ </Text>
    }
    return <Text> ✔︎ </Text>
  }

  renderPhoto(){
    console.log(">>>> Render Photo called")
    console.log(this.props.directive.complete)
    console.log("<<<<<< submissionID", this.props.submissionId)
    if (typeof this.props.submissionId !== 'undefined'){
      //make the axios call to retrieve the submission
      const url = 'https://treasure-chest-api.herokuapp.com/submissions/' + this.props.submissionId
      console.log(url)

      axios.get(url).then( response => {
        console.log("response", response)
        console.log(this.state.submission.photo)

        this.setState( { submission: response.data })

        })
        .catch(function (error) {
          console.log(error);
        });;

      return (
        <View>
          <Image
          source={{ uri: this.state.submission.photo}}
          style={styles.placeholder}
          />
        </View>
      )
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
    return(
      <View>
        <TouchableOpacity onPress={this.toCameraPressed.bind(this)}>
          <Image
          source={require('../assets/ic_photo_camera_36pt.png')}
          style={styles.center}
          />
        </TouchableOpacity>
      </View>
    )
  }

  render(){

    console.log("showing directive description")
    console.log ("this.props.directive", this.props.directive)
    return (
      <ScrollView style={styles.container}>

        <Text style={styles.huntname}>{this.props.hunt.name} </Text>

        <Text style={styles.directive}> {this.checkCompletion()}{this.props.directive.name}
        </Text>

        <Text>{this.props.directive.description}</Text>

        { this.renderPhoto() }
        { this.renderCameraIcon() }
        { this.renderCaption() }

        <Button onPress={this.updateCaptionPressed.bind(this)}> Update Caption </Button>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  caption: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  huntname: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Pacifico'
  },
  captiontext:{
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 10,
    fontFamily: "Chalkboard SE"
  },
  center:{
    alignSelf: 'center'
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 10,
    fontFamily: "Chalkboard SE",
    color: '#DCDCDC',
  },
  directive: {
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
    fontFamily: "Chalkboard SE"
  },
  placeholder: {
    margin: 2,
    height: 250,
    width: 250,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#21b6cb',
    alignSelf: 'center'
  },
});

export default DirectiveShow;
