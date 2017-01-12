//input.js

import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}> {label} </Text>
      <TextInput
        autoCorrect = {false}
        autoCapitalize = {'none'}
        secureTextEntry = {secureTextEntry}
        placeholder = {placeholder}
        style = {inputStyle}
        value = {value}
        onChangeText = {onChangeText}/>
    </View>
  );
};

const styles = {
 inputStyle: {
   color: '#000',
   paddingRight: 5,
   paddingLeft: 0,
   fontSize: 18,
   lineHeight: 23,
   flex: 2
 },

 labelStyle: {
   fontSize: 18,
   paddingLeft: 10,
   flex: 1
 },

 containerStyle: {
   height: 40,
  //  flex: 1,
   width: 300,
   flexDirection: 'row',
   alignItems: 'center'
 }
};

export default Input;
