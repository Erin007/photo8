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

  state = { caption: '', error: '', loading: false, submission: {}, submissionId: '', thisplayersteam: ''}

  //check for submissions to this directive by this team
  componentWillMount(){
    this.getPlayersTeamInfo()
  }

  getPlayersTeamInfo(){
    console.log("Getting the player's team info")
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
      this.setState( { submission: response.data[0] })
      })
      .then(this.handleSubmission.bind(this))
      .catch(function (error) {
        console.log(error);
      });;
  }

  handleSubmission(){
    console.log("HANDLING THE SUBMISSION RETURNED")
    console.log("submission", this.state.submission)
    if (typeof this.state.submission == 'undefined' ){
      console.log("THERE ARE NOT ANY SUBMISSIONS FOR THIS DIRECTIVE FROM THIS TEAM YET!")
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
        console.log("response", response)
        this.setState({ submission: response.data })
      })
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

  renderCaption(){
    if (typeof this.state.submission !== 'undefined'){
      if (this.state.submission.caption !== ''){
        console.log("ALL THE CRITERIA FOR SHOWING CAPTION HAS BEEN MET")
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

  renderPhoto(){
    console.log("Render Photo called")

    if (typeof this.state.submission !== 'undefined'){
      if (this.state.submission.photo !== ''){
        return (
          <View>
            <Image
            source={{ uri: this.state.submission.photo}}
            style={styles.placeholder}
            />
          </View>
        )
      }
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

  render(){
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
    fontSize: 16,
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
