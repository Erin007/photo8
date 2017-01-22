//HuntListPlayer.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  SideMenu,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Button from './common/Button';
import findHunt from './HuntFinder';
import huntDetails from './HuntDetails';
import axios from 'axios';

class HuntListPlayer extends Component {

  state = { hunts: [], hunt: {}, user: this.props.user };

  componentWillMount(){

    const url = 'https://treasure-chest-api.herokuapp.com/hunts/find/player/' + this.props.user.id

    axios.get(url).then( response => {
      console.log("response from HuntListPlayer", response)
      return this.setState( { hunts: response.data })
     })
      .catch(function (error) {
        console.log(error);
      });;
  }

  renderHunts(){
    console.log(this.state.hunts)
    if (this.state.hunts.length > 0) {
      return this.state.hunts.map(hunt =>

        <TouchableOpacity onPress={() => this.huntShowPressed(hunt)} key={ hunt.id } hunt={hunt}>

          <Text style={styles.hunt}>
              {hunt.name}
          </Text>
        </TouchableOpacity>
        );
    }
    return <Text style={styles.smallertext}> You are not participating in any hunts </Text>
  }

  huntShowPressed(hunt){
    console.log("huntShowPressed")
    this._toHuntShow(hunt);
  }

  _toHuntShow = (hunt) => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails,
      passProps: { hunt: hunt,
                   user: this.state.user }
    });
  }

  joinHuntPressed() {
    console.log('>>> Join Hunt Button Pressed!');
    this._toJoinHunt();
  }

  _toJoinHunt = () => {
    this.props.navigator.push({
      title: 'Join Hunt',
      component: findHunt,
      passProps: { user: this.props.user},
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>
           Snapenger Hunt
        </Text>

        <Text style={styles.text}>
           Hunts You Play
        </Text>

        <ScrollView style={styles.scrollview}>
          {this.renderHunts()}
        </ScrollView>

        <Button onPress={this.joinHuntPressed.bind(this)}>Join a New Hunt</Button>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    paddingTop: 10,
    fontFamily: 'Pacifico',
  },
  text: {
    fontSize: 25,
    textAlign: 'left',
    // padding: 10,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE'
  },
  hunt:{
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
    paddingLeft: 10,
    width: 275
  },
  smallertext: {
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Chalkboard SE',
    color: '#DCDCDC',
  },
  scrollview: {
    marginTop: -50,
    marginBottom: 25,
    height: 275,
    // borderBottomWidth: 3
  }
});

export default HuntListPlayer;
