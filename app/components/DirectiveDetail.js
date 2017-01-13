//DirectiveDetail.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection'

const DirectiveDetail = (props, onPress) => {
console.log("made a directiveDetail")
console.log(props)
console.log(onPress)
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <CardSection>
          <Text>{ props.directive.name }</Text>
        </CardSection>
      </Card>
    </TouchableOpacity>
  )
};

export default DirectiveDetail;
