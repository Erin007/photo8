//input.js

import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, onPress }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      
      <TextInput
        autoCorrect = {false}
        autoCapitalize = {'none'}
        secureTextEntry = {secureTextEntry}
        placeholder = {placeholder}
        style = {inputStyle}
        value = {value}
        onChangeText = {onChangeText}
        enablesReturnKeyAutomatically = {true}/>

    </View>
  );
};

const styles = {
 inputStyle: {
   color: '#000',
  //  paddingRight: 5,
  //  paddingLeft: -50,
   fontSize: 18,
   lineHeight: 23,
   flex: 2,
   textAlign: 'center',
   alignItems: 'center'
 },

 // labelStyle: {
 //   fontSize: 14,
 //   paddingLeft: 10,
 //   flex: 1
 // },

 containerStyle: {
   height: 50,
  // flex: 1,
   width: 250,
   marginTop: 5,
   marginBottom: 5,
   marginLeft: 10,
   marginRight: 10,
   flexDirection: 'row',
   alignItems: 'center',
   borderWidth: 1,
   borderRadius: 5,
   borderColor: '#21b6cb',
   backgroundColor: '#fff',
 }
};

export default Input;
