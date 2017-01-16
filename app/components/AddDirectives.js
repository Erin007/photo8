//AddDirective.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView
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
    this.state.directives.push(directive)
    console.log(directive)
    console.log(this.state.directives)

    //clear the form
    this.setState({
      directive: '',
      loading: false,
      error: ''
    })
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

  renderDirectives() {
    console.log("rendering directives")
    if (this.state.directives[0] !== '')  {
      console.log(this.state.directives)

      return this.state.directives.map(directive =>

          <Text style={styles.directive}>
              {directive}
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

        <Button style={styles.button} onPress={() =>
          this.seeHuntPressed(this.props.hunt)}> See Hunt
        </Button>

        <CardSection>
          <Input
            label = ""
            placeholder = "Directive"
            //secureTextEntry
            value = {this.state.directive}

            onChangeText = {directive => this.setState({ directive })}/>
        </CardSection>

        <Button style={styles.button} onPress={() => this.addDirectivePressed(this.state.directive)}> Add Directive </Button>

        <ScrollView style={styles.scrollview}>
          {this.renderDirectives()}
        </ScrollView>

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
  button:{
    flex: 2,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
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
  directive: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 5,
    fontFamily: 'Chalkboard SE',
    color: '#DCDCDC',
  }
});

export default addDirectives;
