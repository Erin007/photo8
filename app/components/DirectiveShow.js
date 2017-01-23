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

class DirectiveShow extends Component {

  state = { caption: '', error: '', loading: false, submission: {}, submissionId: '', thisplayersteam: ''}

  //check for submissions to this directive by this team
  componentWillMount(){
    this.getPlayersTeamInfo()
  }

  getPlayersTeamInfo(){
    console.log("Getting the player's team info")
    console.log(' Directive VIew this.props', this.props)
    console.log("hunt_id", this.props.hunt.id)
    console.log("user_id", this.props.user.id)

    //make an axios call to get the team that this player is on for this hunt
    const url = 'https://treasure-chest-api.herokuapp.com/teams/find/' + this.props.hunt.id + '/' + this.props.user.id

    axios.get(url).then( response => {
      console.log("TEAM", response)
      return this.setState( { thisplayersteam: response.data })
    })
      .then(this.getSubmission.bind(this))
      .catch(function (error) {
        console.log(error);
      });;
  }

  getSubmission(){
    console.log("team_id", this.state.thisplayersteam.id)
    console.log("directive_id", this.props.directive.id )
    const url = 'https://treasure-chest-api.herokuapp.com/submissions/find/' + this.state.thisplayersteam.id + '/' + this.props.directive.id

    axios.get(url).then( response => {
      console.log("response SUBMISSION", response.data)
      this.setState( { submission: response.data })
      })
      .then(this.updateStatus.bind(this))
      .then(this.handleSubmission.bind(this))
      .catch(function (error) {
        console.log(error);
      });;
  }

  handleSubmission(){
    console.log("handling the submission returned")

    if (typeof this.state.submission[0] == 'undefined' ){
      //if a submission wasn't found, make a new 'shell' submission so adding a caption and adding a photo can both be updates/put requests
      const url = 'https://treasure-chest-api.herokuapp.com/submissions/'

      axios.post(url,{
        directive_id: this.props.directive.id,
        team_id: this.state.thisplayersteam.id,
        photo: '',
        caption: '',
        status: 0
      })
      .then(response => {
        console.log("response from handling the submission", response)
        this.setState({ submission: response.data })
      })
      .then(this.updateStatus.bind(this))
      .catch((error) => {
        console.log("Error:", error)
      });
    }
  }

  checkCompletion(){
    if (this.props.directive.complete == null || this.props.directive.complete == false ){

       return <Text> ❏ </Text>
    }
    return <Text> ✔︎ </Text>
  }

  updateStatus(){
    console.log('update status called')
    // check if a photo and caption have been submitted
    if (this.state.submission[0].photo !== '' && this.state.submission[0].caption !== '' && this.state.submission[0].status !== 2){
    //update the submission status to 1 in the backend
      const url = 'https://treasure-chest-api.herokuapp.com/submissions/' + this.state.submission[0].id
      axios.patch(url, {
        status: 1
      })
      .then(response => {
        console.log("response", response)
       this.setState({ submission: response.data })
      })
      .catch((error) => {
        console.log("Error:", error)
      });
    }
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
                  thisplayersteam: this.state.thisplayersteam},
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
                  thisplayersteam: this.state.thisplayersteam},
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

//render helper methods
  renderCaption(){
    if (typeof this.state.submission[0] !== 'undefined'){
      if (this.state.submission[0].caption !== ''){

        return(
          <Text style={styles.captiontext}> {this.state.submission.caption} </Text>
        )
      }
    }
    return(
      <Text style={styles.text}> You have not yet submitted a caption.
      </Text>
    )
  }

  renderCaptionButton(){
    if (typeof this.state.submission[0] !== 'undefined'){
      if (this.state.submission[0].status !== 2){
        return(
          <Button onPress={this.updateCaptionPressed.bind(this)}> Update Caption </Button>
        )
      }
    }
  }

  renderPhoto(){
    console.log("Render Photo called")

    if (typeof this.state.submission[0] !== 'undefined'){
      //if there is a photo, awaiting approval
      if (this.state.submission[0].status == 1){
        return (
          <View>
            <Image
            source={{ uri: this.state.submission[0].photo}}
            style={styles.status1image}
            />
          </View>
        )
      }
      //if there is an approved photo
      if (this.state.submission[0].status == 2){
        return (
          <View>
            <Image
            source={{ uri: this.state.submission[0].photo}}
            style={styles.status2image}
            />
          </View>
        )
      }
      //if there is a denied photo
      if (this.state.submission[0].status == 3){
        return (
          <View>
            <Image
            source={{ uri: this.state.submission[0].photo}}
            style={styles.status3image}
            />
          </View>
        )
      }
    //if there isn't a photo
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
    if (typeof this.state.submission[0] !== 'undefined'){
      if (this.state.submission[0].status !== 2){
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
  }

  renderStatus(){
    console.log("rendering the status")

    if (typeof this.state.submission[0] !== 'undefined'){

      if (this.state.submission[0].status == 1){
        return(
          <Text style={styles.status1}> submission is awaiting approval </Text>
        )
      }

      if (this.state.submission[0].status == 2){
        return(
          <View>
            <Text style={styles.status2}> Submission approved! </Text>
            <Text style={styles.status2}> {this.props.directive.point_value} point(s) </Text>
          </View>
        )
      }

      if (this.state.submission[0].status == 3){
        return(
          <Text style={styles.status3}> Submission denied. Try again. </Text>
        )
      }
    }
  }

  render(){
    return (
      <ScrollView style={styles.container}>

        <TouchableOpacity onPress={() =>this.seeHuntPressed()}>
          <Text style={styles.huntname}>{this.props.hunt.name} </Text>
        </TouchableOpacity>

        <Text style={styles.directive}> {this.checkCompletion()}{this.props.directive.name}
        </Text>

        <Text>{this.props.directive.description}</Text>

        { this.renderStatus() }

        { this.renderPhoto() }
        { this.renderCameraIcon() }
        { this.renderCaption() }
        { this.renderCaptionButton() }

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
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 5,
    fontFamily: "Chalkboard SE"
  },
  center:{
    alignSelf: 'center',
    margin: 3
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 10,
    fontFamily: "Chalkboard SE",
    color: '#DCDCDC',
  },
  status1image:{
    borderColor: '#DCDCDC',
    borderWidth: 5,
    margin: 2,
    height: 250,
    width: 250,
    borderRadius: 5,
    alignSelf: 'center'
  },
  status2image:{
    borderColor: '#24AE62',
    borderWidth: 5,
    margin: 2,
    height: 250,
    width: 250,
    borderRadius: 5,
    alignSelf: 'center'
  },
  status3image:{
    borderColor: '#991c1c',
    borderWidth: 5,
    margin: 2,
    height: 250,
    width: 250,
    borderRadius: 5,
    alignSelf: 'center'
  },
  status1:{
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 5,
    marginTop: -5,
    fontFamily: "Chalkboard SE",
    color: '#DCDCDC',
  },
  status2:{
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 5,
    marginBottom: 5,
    fontFamily: "Chalkboard SE",
    color: '#24AE62',
  },
  status3:{
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 5,
    marginTop: -5,
    fontFamily: "Chalkboard SE",
    color: '#b22121',
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
    borderWidth: 5,
    borderRadius: 5,
    borderColor: '#21b6cb',
    alignSelf: 'center'
  },
});

export default DirectiveShow;
