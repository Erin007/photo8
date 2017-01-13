import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import huntDetails from './ShareHunt';
import DirectiveList from './DirectiveList'
import Button from './common/Button';
import Input from './common/Input';
import Card from './common/Card';
import CardSection from './common/CardSection';

class newHunt extends Component{

  state = { huntName: '', description: '', directives: [], directive: '', error: '', loading: false}

  savePressed() {
    console.log('>>> Save Button Pressed!');
    this._toShareHunt();
  }

  _toShareHunt = () => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
           This is where there will be a form for users to make a new hunt!
        </Text>

        <Card>
          <CardSection>
            <Input
              label = "Name:"
              placeholder = "Explore the Emerald City!"
              value = {this.state.huntName}
              onChangeText = {huntName => this.setState({ huntName })}/>
          </CardSection>

          <CardSection>
            <Input
              label = "Description:"
              placeholder = ""
              //secureTextEntry
              value = {this.state.description}
              onChangeText = {description => this.setState({ description })}/>
          </CardSection>

          <CardSection>
            <Input
              label = "Directive:"
              placeholder = "your group at the Space Needle"
              //secureTextEntry
              value = {this.state.directive}
              //What I need to do here is add the directive to an array of directives and then render the directives already in the array below the form so the user knows what they have already entered
              //maybe also a counter of how many directives are already attached to the hunt?
              onChangeText = {directive => this.setState({ directive })}/>
          </CardSection>
        </Card>

        <Button onPress={this.savePressed.bind(this)}> Save </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 10
  },
});

export default newHunt;
