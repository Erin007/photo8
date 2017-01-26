import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';

const InputPlus = ({ label, value, onChangeText, placeholder, secureTextEntry, onPress }) => {
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
   fontSize: 18,
   lineHeight: 23,
   flex: 2,
   textAlign: 'center'
 },
 containerStyle: {
   height: 50,
   width: 250,
   margin: 8,
   flexDirection: 'row',
   alignItems: 'center',
   borderWidth: 1,
   borderRadius: 5,
   borderColor: '#006666',
   backgroundColor: '#fff',
 }
};

export default InputPlus;
