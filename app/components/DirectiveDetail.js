//DirectiveDetail.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection'

const DirectiveDetail = (props) => {
console.log("made a directiveDetail")
//console.log(props)

  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card>
        <CardSection>
          <Text>{ props.directive.name }</Text>
        </CardSection>
      </Card>
    </TouchableOpacity>
  )
};

export default DirectiveDetail;
