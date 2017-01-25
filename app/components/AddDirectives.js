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
import AddTeams from './AddTeams'
import Button from './common/Button';
import InputPlus from './common/InputPlus';
import Spinner from './common/Spinner';
import DirectiveListOrganizer from './DirectiveListOrganizer';
import huntDetails from './HuntDetails';
import axios from 'axios';

class addDirectives extends Component {
  state = { directive: '', huntId:'', error: '', loading: false, hunt: {}, directives : []}

  componentWillMount (){

    const url = 'https://treasure-chest-api.herokuapp.com/directives/find/' + this.props.hunt.id

    axios.get(url).then( response => {
      console.log("response from directivelist", response)
      return this.setState( { directives: response.data })
     })
      .catch(function (error) {
        console.log(error);
      });;
  }

  addDirectivePressed(directive){

    axios.post('https://treasure-chest-api.herokuapp.com/directives',{
      name: this.state.directive,
      point_value: 1,
      hunt_id: this.props.hunt.id,
      description: ""
    })
    .then(response => {
      console.log("response", response)
      console.log("response.data", response.data)
      return this.setState( { directive: response.data })
    })
      //if the directive is saved successfully
    .then(this.componentWillMount())
    //if there was a problem saving the hunt
    .catch((error) => {
      console.log("The directive did not save")

      this.setState({ error: "There was an error saving your directive. Please try again.", loading: false })

      console.log(error)
    });

    //clear the form
    this.setState({
      directive: '',
      loading: false,
      error: ''
    })
  }

//navigate to huntDetails
  seeHuntPressed() {
    console.log('seeHunt pressed');
    this._toHuntDetails()
  }

  _toHuntDetails = () => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails,
      passProps: { hunt: this.props.hunt,
                  user: this.props.user}
    });
  }

//navigate back to the DirectiveListOrganizer
  seeDirectivesPressed() {
    console.log("seeDirectivesPressed")
    this._toDirectiveList()
  }

  _toDirectiveList = () => {
    this.props.navigator.push({
      title: 'Directives',
      component: DirectiveListOrganizer,
      passProps: { hunt: this.props.hunt,
                  user: this.props.user}
    });
  }

//helper functions to render things
  renderDirectives() {
    console.log("rendering directives")

    if (this.state.directives[0] !== '')  {
      console.log(this.state.directives)

      return this.state.directives.map(directive =>

          <Text style={styles.directive} key={directive.id}>
              {directive.name}
          </Text>
      );
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() =>
        this.seeHuntPressed()}>
          <Text style={styles.name}>
            {this.props.hunt.name}
          </Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          What should the hunters look for?
        </Text>

        <View style={styles.directivebox}>
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
          this.seeDirectivesPressed()}> See Directives
        </Button>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 60
  },
  scrollview: {
    marginTop: 10,
    marginBottom: 10,
    height: 200,
  },
  directivebox: {
    flexDirection: 'row',
    marginBottom: 5,
    width: 300
  },
  plus:{
    width: 40,
    height: 40,
    backgroundColor: "#21b6cb",
    paddingTop: 12,
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#167c89',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor:'#167c89',
    marginTop: 12,
    alignItems: 'center',
  },
  name: {
    fontSize: 32,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Pacifico'
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Chalkboard SE'
  },
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
    fontFamily: "Chalkboard SE",
    textAlign: 'center',
    marginTop: -20,
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
