//DirectiveDetail.js

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection'

class  DirectiveDetail extends Component{

// state = { directive: }

componentWillMount (){
  console.log("made a directiveDetail")
  console.log(props)

    return this.setState( { directive: this.props.directive })
}

render(){
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Card>
          <CardSection>
            <Text>{ this.props.directive.name }</Text>
          </CardSection>
        </Card>
      </TouchableOpacity>
    )
  }
};

export default DirectiveDetail;
