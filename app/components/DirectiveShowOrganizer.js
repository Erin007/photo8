//DirectiveShowOrganizer.js

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

class DirectiveShowOrganizer extends Component {

  render(){
    return(
      <View>
        <Text style={styles.text}> This will show all of the submissions for this directive labeled by team.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
text: {
  fontSize: 18,
  textAlign: 'center',
  paddingTop: 10,
  marginTop: 75
},
})
export default DirectiveShowOrganizer;
