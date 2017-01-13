import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import DirectiveList from './DirectiveList';
import Button from './common/Button';
import Input from './common/Input';
import Spinner from './common/Spinner';
import Card from './common/Card';
import CardSection from './common/CardSection';

class findHunt extends Component{

  state = { huntName: '', passcode: '', error: '', loading: false, hunt: {}}

  findPressed() {
    console.log('>>> Find Hunt Button Pressed!');

    const { huntName, passcode } = this.state;

    this.setState({ error: '', loading: true });
    console.log("this.state.huntName", this.state.huntName)

    //this needs to be conditional on the successful save of the new hunt to the api, the api will have to send some signal letting the mobile app know it's been successful
    this._toDirectiveList();
  }

  _toDirectiveList = () => {
    this.props.navigator.push({
      title: 'Hunt',
      component: DirectiveList
    });
  }

  renderFindButton(){
    if (this.state.loading){
      return <Spinner size="small"/>
    }
    return(
      <Button onPress={this.findPressed.bind(this)}>Find</Button>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
           This is where users will enter the hunt id and passcode for a hunt!
        </Text>

        <Card>
          <CardSection>
            <Input
              label = "Hunt:"
              placeholder = "Explore Seattle!"
              value = {this.state.huntName}
              onChangeText = {huntName => this.setState({ huntName })}/>
          </CardSection>

          <CardSection>
            <Input
              label = "Passcode:"
              placeholder = "passcode"
              //secureTextEntry
              value = {this.state.passcode}
              onChangeText = {passcode => this.setState({ passcode })}/>
          </CardSection>

          <CardSection>
            { this.renderFindButton() }
          </CardSection>
        </Card>

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

export default findHunt;
