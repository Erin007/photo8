//AddDirective.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import DirectiveList from './DirectiveList';
import Button from './common/Button';
import InputPlus from './common/InputPlus';
import Spinner from './common/Spinner';
import Card from './common/Card';
import CardSection from './common/CardSection';
import huntDetails from './HuntDetails';
import axios from 'axios';

class addDirectives extends Component{
  state = { directive: '', huntId:'', error: '', loading: false, hunt: {}, directives : []}

  addDirectivePressed(directive){
    console.log('>>> Add Directive pressed');
    //axios post the directive
    //var url = 'https://treasure-chest-api.herokuapp.com/hunts/' + this.props.hunt.id + '/directives'
    //console.log(url)
    console.log(this.state.directive)
    console.log(this.props.hunt.id)

    axios.post('https://treasure-chest-api.herokuapp.com/directives',{
      name: this.state.directive,
      point_value: 1,
      hunt_id: this.props.hunt.id,
      description: ""
    })
    .then(response => {
      console.log("response", response)
      console.log("response.data", response.data)
      // return this.setState( { hunt: response.data })
    })
      //if the directive is saved successfully
    //.then(this.directiveSaved.bind(this))
    //if there was a problem saving the hunt
    .catch((error) => {
      console.log("The directive did not save")

      this.setState({ error: "There was an error saving your directive. Please try again.", loading: false })

      console.log(error)
    });

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

          <Text style={styles.directive} key={directive}>
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

        <Text style={styles.text}>
          What should the hunters look for?
        </Text>

        <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20}}>
          <InputPlus
            label = ""
            placeholder = "directive"
            //secureTextEntry
            value = {this.state.directive}
            onChangeText = {directive => this.setState({ directive })}/>

            <TouchableOpacity style={styles.plus} onPress={() => this.addDirectivePressed(this.state.directive)}>
              <Text>✚</Text>
            </TouchableOpacity>
        </View>

        <Text style= {styles.errorTextStyle}>
          { this.state.error }
        </Text>


        <ScrollView style={styles.scrollview}>
          {this.renderDirectives()}
        </ScrollView>


        <Button style={styles.button} onPress={() =>
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
  scrollview:{
    width: 300,
    margin: 5,
    height: 100,
  },
  plus:{
    width: 30,
    height: 30,
    backgroundColor: "#21b6cb",
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#167c89',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor:'#167c89',
    marginTop: 15
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Pacifico'
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    paddingTop: 20,
    fontFamily: 'Chalkboard SE'
  },
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
    fontFamily: "Chalkboard SE",
    marginLeft: 8,
    textAlign: 'center',
    marginTop: 0,
    padding: 10,
    marginBottom: 10
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
