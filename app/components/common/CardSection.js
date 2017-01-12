//CardSection.js

import React from 'react';
import { View } from 'react-native';
import Card from './Card';

const CardSection = (props) => {
  return (
  <View style={styles.containerStyle}>
    { props.children }
  </View>
  );
};

const styles = {
  constainerStyle: {
    borderBottomWidth: 10,
    padding: 50,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    marginTop: 10,
  }
};

export default CardSection;
