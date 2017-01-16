//AddDirective.js
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
import huntDetails from './HuntDetails';

class addDirectives extends Component{
  state = { directive: '', huntId:'', error: '', loading: false, hunt: {}, directives : []}

  addDirectivePressed(directive){
    console.log('>>> Add Directive pressed');
    //axios post the directive

    //show the organizer the list of directives they've made so far by rendering them to the screen





    //this.state.directives.push(directive)
    console.log(directive)
    console.log(this.state.directives)
    //this.setState( { directives: response.data.directives })
  }

  seeHuntPressed(hunt) {
    console.log('>>> See Hunt pressed');
    console.log("this.props.hunt.name", this.props.hunt.name)
    console.log("hunt", hunt)
    this._toHuntDetails(hunt)
  }

  _toHuntDetails = (hunt) => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails,
      passProps: { hunt: {hunt}}
    });
  }

  renderDirective(directive) {
    if (typeof this.state.directive !== '')  {

      return(
          <Text style={styles.directive}>
             ❏  {directive.name}
          </Text>
        );
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <Text style={styles.name}>
          {this.props.hunt.name}
        </Text>

        <Text>
          {this.props.hunt.description}
        </Text>

        <CardSection>
          <Input
            label = ""
            placeholder = "Directive"
            //secureTextEntry
            value = {this.state.directive}
            //What I need to do here is add the directive to the backend with the hunt_id set for the current hunt and then render the directives already associated with the hunt below the form so the user knows what they have already entered
            //maybe also a counter of how many directives are already attached to the hunt?
            onChangeText = {directive => this.setState({ directive })}/>
        </CardSection>

        <Button onPress={() => this.addDirectivePressed(this.state.directive)}> Add Directive </Button>

        {this.renderDirective()}

        <Button onPress={() =>
          this.seeHuntPressed(this.props.hunt)}> See Hunt
        </Button>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: '',
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    //margin: 5,
    //marginTop: 55,
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Pacifico'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 20,
    fontFamily: 'Chalkboard SE'
  },
});

export default addDirectives;
