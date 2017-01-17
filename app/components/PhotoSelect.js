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

class PhotoSelect extends Component {
  state = { image:'', error: '', loading: false, images: [], selected: '',}

    componentDidMount() {
        const fetchParams = {
            first: 3,
        };
        CameraRoll.getPhotos(fetchParams, this.storeImages, this.logImageError);
    }

    storeImages(data) {
        const assets = data.edges;
        const images = assets.map((asset) => asset.node.image);
        console.log("images", images);
        this.setState({
            images: images,
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
        <View style={styles.imageGrid}>
        {
          this.state.images.map((image, index) => {
            return (
                <TouchableHighlight key={"image" + index} onPress={this.selectImage.bind(null, image.uri)}>
                    <Image style={styles.image} source={{ uri: this.state.image.uri }} />
                </TouchableHighlight>
            );
          })
        }
        </View>
      </ScrollView>
    )
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
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default PhotoSelect;
