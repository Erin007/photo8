//Profile.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  SideMenu,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

import Button from './common/Button';
import LoginForm from './LoginForm';
import Spinner from './common/Spinner';
import Input from './common/Input';
import UpdateProfile from './UpdateProfile';
import welcomeCopy from './WelcomeCopy';
import axios from 'axios';

class Profile extends Component {

//navigate the user to the 'home' page
  toHome(){
    console.log('The user wants to go home');
    this._toHome();
  }

  _toHome = () => {
    this.props.navigator.push({
      title: 'Home',
      component: welcomeCopy,
      passProps: { hunt : this.props.hunt,
                   user : this.props.user}
    });
  }

  updateProfilePressed(){
    this._toUpdateProfile()
  }

  _toUpdateProfile = () => {
    this.props.navigator.push({
      title: 'Update Profile',
      component: UpdateProfile,
      passProps: { hunt : this.props.hunt,
                   user : this.props.user}
    });
  }

  render(){
    console.log("Profile this.props", this.props)
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toHome.bind(this)}>
          <Text style={styles.welcome}>
             Snapenger Hunt
          </Text>
        </TouchableOpacity>

        <Image
        source={require('../assets/imgres.jpg')}
        style={styles.image}
        />

        <View style={styles.profilebox}>
          <Text style={styles.smalltext}>{ this.props.user.username }</Text>

          <Text style={styles.smallertext}>{ this.props.user.location } </Text>

          <Text style={styles.smallertext}>{ this.props.user.bio }</Text>
        </View>

        <Button onPress={this.updateProfilePressed.bind(this)}>
          Update Profile
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 20
  },
  profilebox: {
    marginBottom: 30
  },
  welcome: {
    fontSize: 42,
    textAlign: 'center',
    margin: 10,
    paddingTop: 10,
    fontFamily: 'Pacifico',
  },
  smalltext: {
    fontSize: 25,
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 5,
    fontFamily: 'Chalkboard SE'
  },
  smallertext: {
    fontSize: 18,
    alignSelf: 'flex-start',
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 20,
    marginRight: 5,
    fontFamily: 'Chalkboard SE'
  },
  image: {
    margin: 2,
    height: 150,
    width: 150,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'black',
    alignSelf: 'center',
    marginLeft: 15
  },
})

export default Profile;
