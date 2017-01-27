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
import huntDetails from './HuntDetails';
import styles from './styles';

class DirectiveShow extends Component {

  state = { caption: '', error: '', loading: false, submission: [], submissionId: '', thisplayersteam: ''}

  //check for submissions to this directive by this team
  componentWillMount(){

    //get the submission by searching with this teamid and this directive id
    const url2 = 'https://treasure-chest-api.herokuapp.com/submissions/find/' + this.props.thisplayersteam.id + '/' + this.props.directive.id

    axios.get(url2).then( response => {

      if (response.data !== null){
        this.setState( { submission: response.data })
      }
      })
      .then(this.checkForSubmission.bind(this))
      .catch(function (error) {
        console.log(error);
      });;
  }

  checkForSubmission(){

    //if there isn't a submission
    if (this.state.submission.length == 0){

      // make a new 'shell' submission so adding a caption and adding a photo can both be updates/put requests
      const url3 = 'https://treasure-chest-api.herokuapp.com/submissions/'

      axios.post(url3,{
        directive_id: this.props.directive.id,
        team_id: this.props.thisplayersteam.id,
        photo: '',
        caption: '',
        status: 0,
        directive_name: this.props.directive.name
      })
      .then(response => {
        console.log("response from handling the submission", response.data)
        this.setState({ submission: response.data })
      })
      .catch((error) => {
        console.log("Error from trying to post a new submission:", error)
      });
    }
    this.updateStatus()
  }

  checkCompletion(){
    if (this.props.directive.complete == null || this.props.directive.complete == false ){

       return <Text> ❏ </Text>
    }
    return <Text> ✔︎ </Text>
  }

  updateStatus(){

  // check if a photo and caption have been submitted
    if (this.state.submission.photo !== '' && this.state.submission.status !== 2){
    //update the submission status to 1 in the backend
      const url = 'https://treasure-chest-api.herokuapp.com/submissions/' + this.state.submission.id
      axios.patch(url, {
        status: 1
      })
      .then(response => {
        console.log("response", response)
       this.setState({ submission: response.data })
      })
      .catch((error) => {
        console.log("Error from trying to update the status:", error)
      });
    }
  }

//render helper methods
  renderCaption(){

    if (this.state.submission.caption !== '' && typeof this.state.submission.caption !== 'undefined'){
      return(
        <Text style={styles.smallcenteredtext}> {this.state.submission.caption} </Text>
      )
    }

    return(
      <Text style={styles.tinytext}> You have not yet submitted a caption.
      </Text>
    )
  }

  renderCaptionButton(){

    if (this.state.submission !== null ){
      if (this.state.submission.status !== 2){
        return(
          <Button onPress={this.updateCaptionPressed.bind(this)}> Update Caption </Button>
        )
      }
    }
  }

  renderPhoto(){
      //if there is a photo, awaiting approval
      if (this.state.submission.status == 1){
        return (
          <View>
            <Image
            source={{ uri: this.state.submission.photo}}
            style={styles.status1image}
            />
          </View>
        )
      }
      //if there is an approved photo
      if (this.state.submission.status == 2){
        return (
          <View>
            <Image
            source={{ uri: this.state.submission.photo}}
            style={styles.status2image}
            />
          </View>
        )
      }
      //if there is a denied photo
      if (this.state.submission.status == 3){
        return (
          <View>
            <Image
            source={{ uri: this.state.submission.photo}}
            style={styles.status3image}
            />
          </View>
        )
      }
    //if there isn't a photo
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

    if (this.state.submission.status !== 2){
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
  }

  renderStatus(){

    if (this.state.submission.status == 1){
      return(
        <Text style={styles.status1}> submission is awaiting approval </Text>
      )
    }

    if (this.state.submission.status == 2){
      return(
        <View>
          <Text style={styles.status2}> Submission approved! </Text>
          <Text style={styles.status2}> {this.props.directive.point_value} point(s) </Text>
        </View>
      )
    }

    if (this.state.submission.status == 3){
      return(
        <Text style={styles.status3}> Submission denied. Try again. </Text>
      )
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() =>this.seeHuntPressed()}>
          <Text style={styles.huntname}>{this.props.hunt.name} </Text>
        </TouchableOpacity>

        <Text style={styles.text}> {this.checkCompletion()}{this.props.directive.name}
        </Text>

        <Text style={styles.text}>{this.props.directive.description}</Text>

        { this.renderStatus() }
        { this.renderPhoto() }
        { this.renderCameraIcon() }
        { this.renderCaption() }
        { this.renderCaptionButton() }

      </View>
    )
  }

//navigate to the camera
  toCameraPressed() {
    console.log('To Camera Pressed');
    this._toCamera();
  }

  _toCamera = () => {
    this.props.navigator.push({
      title: 'Camera',
      component: Example,
      passProps: { user: this.props.user,
                  directive: this.props.directive,
                  hunt: this.props.hunt,
                  submission: this.state.submission,
                  thisplayersteam: this.props.thisplayersteam},
    });
  }

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
                  hunt: this.props.hunt,
                  submission: this.state.submission,
                  thisplayersteam: this.props.thisplayersteam},
    });
  }

//navigate back to HuntDetails
  seeHuntPressed() {
    console.log('seeHunt pressed');
    this._toHuntDetails()
  }

  _toHuntDetails = () => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails,
      passProps: { hunt: this.props.hunt,
                  user: this.props.user}
    });
  }
};

// const styles = StyleSheet.create({
//
//   caption: {
//     paddingLeft: 15,
//     paddingRight: 15,
//   },
//   captiontext:{
//     fontSize: 16,
//     textAlign: 'center',
//     fontFamily: "Chalkboard SE"
//   },
//   center:{
//     alignSelf: 'center',
//     margin: 3
//   },
//   text: {
//     fontSize: 14,
//     textAlign: 'center',
//     fontFamily: "Chalkboard SE",
//     color: '#DCDCDC',
//   },
// });

export default DirectiveShow;
