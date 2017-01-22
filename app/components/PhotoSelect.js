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
 import DirectiveShow from './DirectiveShow'

var RCTCameraRollManager = require('NativeModules').CameraRollManager;

class PhotoSelect extends Component {
 //
  state = { image:'', error: '', loading: false, dbimage: '' }

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

 toCameraPressed() {
   console.log('>>> To Camera Pressed');
   this._toCamera();
 }

 _toCamera = () => {
   this.props.navigator.push({
     title: 'Camera',
     component: Example,
     passProps: { directive: this.props.directive },
   });
 }

 usePhotoPressed(){
   console.log('<<< usePhotoPressed')
   //store the image uri in the backend
   //***Change the team id to be specific to the user's team ***//
   axios.post('https://treasure-chest-api.herokuapp.com/submissions',{
     directive_id: this.props.directive.id,
     team_id: 1,
     photo: this.state.image.uri,
     status: 'yellow'
   })
   .then(response => {
     console.log("response", response)
     console.log("response.data", response.data)
     return this.setState( { dbimage: response.data })
   })
     //if the team is saved successfully
   .then(this.photoSaved.bind(this))
   //if there was a problem saving the team
   .catch((error) => {
     console.log("The photo did not save")

     this.setState({ error: "There was an error saving the photo. Please try again.", loading: false })

     console.log(error)
   });
 }

 photoSaved(){
   console.log('<<<Photo Saved Called')
   console.log('submission id:', this.state.dbimage.id )
   //go to Directive Show and make an axios call for the photo
   this._toDirectiveShow();
 }

 _toDirectiveShow = () => {
   this.props.navigator.push({
     title: 'Directive',
     component: DirectiveShow,
     passProps: { submissionId: this.state.dbimage.id,
                  directive: this.props.directive },
   });
 }


 render() {
   return (
     <View style={styles.container}>

      <Text style={styles.text}> {this.props.directive.name} </Text>

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
    marginTop: 50,
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 300,
    height: 300,
    margin: 10,
    borderRadius: 5
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

//     componentDidMount() {
//         const fetchParams = {
//             first: 3,
//         };
//         CameraRoll.getPhotos(fetchParams, this.storeImages, this.logImageError).done(
//           (data) =>{
//              console.log(data);
//             this.setState({
//               photoSource: {uri: data.edges[3].node.image.uri}
//             })
//           },
//           (error) => {
//             console.warn(error);
//           }
//         );;
//     }
//
//     storeImages(data) {
//         const assets = data.edges;
//         const images = assets.map((asset) => asset.node.image);
//         console.log("images", images);
//         this.setState({
//             images: images,
//         });
//     }
//
//     logImageError(err) {
//         console.log(err);
//     }
//
//     selectImage(uri) {
//         NativeModules.ReadImageData.readImage(uri, (image) => {
//             this.setState({
//                 selected: image,
//             });
//             console.log(image);
//         });
//     }
//
//   render() {
//     return (
//       <ScrollView style={styles.container}>
//         <View style={styles.imageGrid}>
//         {
//           this.state.images.map((image, index) => {
//             return (
//                 <TouchableHighlight key={"image" + index} onPress={this.selectImage.bind(null, image.uri)}>
//                     <Image style={styles.image} source={{ uri: this.state.image.uri }} />
//                 </TouchableHighlight>
//             );
//           })
//         }
//         </View>
//       </ScrollView>
//     )
//   }
// }
//
//
