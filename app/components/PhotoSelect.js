//PhotoSelect.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  CameraRoll,
  Dimensions,
  NativeModules,
  TextInput
 } from 'react-native';
 import Button from './common/Button';
 import Example from '../Camera';
 import axios from 'axios';
 import DirectiveShow from './DirectiveShow';
 import huntDetails from './HuntDetails';


var RCTCameraRollManager = require('NativeModules').CameraRollManager;

class PhotoSelect extends Component {
 //
  state = { image:'', error: '', loading: false, submission: '' }

 componentDidMount() {
     console.log(this.props)
     CameraRoll.getPhotos({ first: 1}).done(
        (data) =>{
       console.log("data", data);
       console.log("data.edges", data.edges)
       this.storeImages(data);
        },
        (error) => {
          console.warn(error);
        }
    );
  }

 storeImages(data) {
    console.log(data.edges[0].node.image)
     this.setState({
         image: data.edges[0].node.image
     });
 }

 logImageError(err) {
     console.log(err);
 }

 renderCameraIcon(){
   console.log('<<< Render CameraIcon called')

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

 toCameraPressed() {
   console.log('>>> To Camera Pressed');
   this._toCamera();
 }

 _toCamera = () => {
   this.props.navigator.push({
     title: 'Camera',
     component: Example,
     passProps: { directive: this.props.directive,
       hunt: this.props.hunt,
       user: this.props.user,
       submission: this.props.submission },
   });
 }

 usePhotoPressed(){
   console.log('<<< usePhotoPressed')
   //store the image uri in the backend
   console.log("submission", this.props.submission)

   const url = 'https://treasure-chest-api.herokuapp.com/submissions/' + this.props.submission.id

   axios.patch(url,{
     photo: this.state.image.uri,
   })
   .then(response => {
     console.log("response", response)
     this.setState({ submission: response.data })
   })
   .then(this.photoSaved.bind(this))
   .catch((error) => {
     console.log("Error:", error)
     this.setState({ error: "There was an error with your submission. Please try again.", loading: false })
   });
 }

 photoSaved(){
   console.log('<<<Photo Saved Called')
   this._toDirectiveShow();
 }

 _toDirectiveShow = () => {
   this.props.navigator.push({
     title: 'Directive',
     component: DirectiveShow,
     passProps: { submission: this.state.submission,
                  directive: this.props.directive,
                  hunt: this.props.hunt,
                  user: this.props.user,
                  thisplayersteam: this.props.thisplayersteam },
   });
 }

//navigate to huntDetails
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

 render() {
   return (
     <View style={styles.container}>

     <TouchableOpacity onPress={() => this.seeHuntPressed()}>
       <Text style={styles.huntname}> {this.props.hunt.name}</Text>
     </TouchableOpacity>

     <TouchableOpacity onPress={() => this._toDirectiveShow()}>
        <Text style={styles.text}>    {this.props.directive.name} </Text>
      </TouchableOpacity>

      <Image style={styles.image} source={{ uri: this.state.image.uri }} />

       <Button onPress={this.usePhotoPressed.bind(this)}> Use Photo </Button>

       { this.renderCameraIcon() }

    </View>

   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 45,
  },
  huntname: {
    // marginTop: 65,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Pacifico'
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 275,
    height: 275,
    margin: 10,
    borderRadius: 5,
    alignSelf: 'center'
  },
  camerabutton:{
    borderRadius: 5,
    marginLeft: 150,
    marginTop: 15
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 10,
    fontFamily: 'Chalkboard SE'
  },
});

export default PhotoSelect;
