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

var RCTCameraRollManager = require('NativeModules').CameraRollManager;

class PhotoSelect extends Component {
 //
  state = { image:'', error: '', loading: false, images: [], selected: ''}

 componentDidMount() {

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
    //  const assets = data.edges;
    //  const images = assets.map((asset) => asset.node.image);

    console.log(data.edges[0].node.image)

     this.setState({
         image: data.edges[0].node.image
     });
 }

 logImageError(err) {
     console.log(err);
 }

 selectImage(uri) {
     NativeModules.ReadImageData.readImage(uri, (image) => {
         this.setState({
             selected: image,
         });
         console.log(image);
     });
 }

 render() {
   return (
       <ScrollView style={styles.container}>
        <Text> This is where the picture will show up? </Text>

         <View style={styles.imageGrid}>

           <TouchableOpacity onPress={this.selectImage.bind(null, this.state.image.uri)}>
               <Image style={styles.image} source={{ uri: this.state.image.uri }} />
           </TouchableOpacity>

         </View>
       </ScrollView>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
  }
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
