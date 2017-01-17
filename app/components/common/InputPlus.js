import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';

const InputPlus = ({ label, value, onChangeText, placeholder, secureTextEntry, onPress }) => {
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
        onChangeText = {onChangeText}
        enablesReturnKeyAutomatically = {true}/>
    </View>
  );
};

const styles = {
 inputStyle: {
   color: '#000',
   //paddingRight: 5,
   paddingLeft: -105,
   fontSize: 18,
   lineHeight: 23,
   flex: 2,
   textAlign: 'center'
 },

 labelStyle: {
   fontSize: 18,
   paddingLeft: 10,
   flex: 1
 },

 containerStyle: {
   height: 50,
  // flex: 1,
   width: 280,
   margin: 8,
   flexDirection: 'row',
   alignItems: 'center',
   borderWidth: 1,
   borderRadius: 5,
   borderColor: '#21b6cb',
   backgroundColor: '#fff',
 }
};

export default InputPlus;
