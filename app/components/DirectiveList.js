//DirectiveList.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text } from 'react-native';
import axios from 'axios';
//import DirectiveDetail from './DirectiveDetail';
import DirectiveShow from './DirectiveShow'
import huntDetails from './HuntDetails';

class DirectiveList extends Component {

  state = { directives: [], directive: {}, completeDirectives: [], incompleteDirectives: [], thisplayersteam: ''};

  componentWillMount (){
    console.log('Component will Mount in DirectiveList called')
    const url = 'https://treasure-chest-api.herokuapp.com/directives/find/' + this.props.hunt.id

    axios.get(url).then( response => {
      console.log("response from directivelist", response)
      return this.setState( { directives: response.data })
     })
      .then(this.sortDirectives.bind(this))
      .catch(function (error) {
        console.log(error);
      });;

      //make an axios call to get the team that this player is on for this hunt
      const url2 = 'https://treasure-chest-api.herokuapp.com/teams/find/' + this.props.hunt.id + '/' + this.props.user.id

      axios.get(url2).then( response => {
        console.log("TEAM", response)
        return this.setState( { thisplayersteam: response.data })
      })
        .catch(function (error) {
          console.log(error);
        });;
  }

  sortDirectives(){
    const completeDirectives = []
    const incompleteDirectives =[]

    for (i = 0; i < this.state.directives.length; i++) {
      if (this.state.directives[i].complete == true){
          completeDirectives.push(this.state.directives[i])
      }

      if (this.state.directives[i].complete == false){
          incompleteDirectives.push(this.state.directives[i])
      }
    }
    this.setState({ completeDirectives: completeDirectives, incompleteDirectives: incompleteDirectives})
  }

  renderIncompleteDirectives(){
    if (this.state.incompleteDirectives.length > 0)  {

      return this.state.incompleteDirectives.map(directive =>

        <TouchableOpacity onPress={() => this.directiveShowPressed(directive)} key={ directive.id } directive={directive}>

          <Text style={styles.directive}>
             ❏  {directive.name}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  renderCompleteDirectives(){
    if (this.state.completeDirectives.length > 0)  {

      return this.state.completeDirectives.map(directive =>

        <TouchableOpacity onPress={() => this.directiveShowPressed(directive)} key={ directive.id } directive={directive}>

          <Text style={styles.directive}>
             ✔︎ {directive.name}
          </Text>
        </TouchableOpacity>
      );
    }
  }


//navigation functions
  _toHuntDetails = (hunt) => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails,
      passProps: { hunt: this.props.hunt,
                   user: this.props.user }
    });
  }

  directiveShowPressed(directive) {
    console.log('>>> Directive Detail Pressed!');
    console.log("this.state", this.state)
    this._toDirectiveShow(directive);
  }

  _toDirectiveShow = (directive) => {
    this.props.navigator.push({
      title: 'Directive',
      component: DirectiveShow,
      passProps: { directive: directive,
                   hunt: this.props.hunt,
                   user: this.props.user,
                   thisplayersteam: this.state.thisplayersteam}
    });
  }

  render() {
    console.log('this.state from DirectiveList render', this.state);
    console.log('this.props', this.props)

    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this._toHuntDetails.bind(this)}>
          <Text style={styles.text}> { this.props.hunt.name } </Text>
        </TouchableOpacity>

        <Text style={styles.listname}> Directives </Text>

        <Text style={styles.smalltext}>{this.props.hunt.description}</Text>

        <ScrollView style={styles.scrollview}>
          { this.renderIncompleteDirectives() }
          { this.renderCompleteDirectives() }
        </ScrollView>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 40,
  },
  listname: {
    fontSize: 25,
    textAlign: 'center',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE'
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 20,
    fontFamily: 'Pacifico'
  },
  smalltext: {
    fontSize: 14,
    textAlign: 'left',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE'
  },
  directive:{
    fontSize: 16,
    fontFamily: 'Chalkboard SE',
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 10
  }
});

export default DirectiveList;
