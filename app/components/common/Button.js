//Button.js

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const {buttonStyle, textStyle} = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color:  '#21b6cb',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 3,
    paddingBottom: 3,
    margin: 10,
    fontFamily: 'Chalkboard SE'
  },
  buttonStyle:{
    // flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#21b6cb',
    marginLeft: 30,
    marginTop: 10,
    marginRight: 30,
    // marginBottom: 50
  }
};


export default Button;
