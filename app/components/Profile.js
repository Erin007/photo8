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
import styles from './styles';

class Profile extends Component {

//navigate the user to the 'home' page
  toHome(){
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

//helper render functions
  renderUpdateButton(){
    //conditional based on whether the current user is the one who "owns" this profile
    if (this.props.player.id == this.props.user.id){
      return(
        <Button onPress={this.updateProfilePressed.bind(this)}>
          Update Profile
        </Button>
      )
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toHome.bind(this)}>
          <Text style={styles.welcome}>
             Snapenger Hunt
          </Text>
        </TouchableOpacity>

        <Image
        source={require('../assets/imgres.jpg')}
        style={styles.profileimage}
        />

        <View style={styles.profilebox}>
          <Text style={styles.smalltext}>{ this.props.player.username }</Text>

          <Text style={styles.smallertext}>{ this.props.player.location } </Text>

          <Text style={styles.smallertext}>{ this.props.player.bio }</Text>
        </View>

        {this.renderUpdateButton()}

      </View>
    )
  }
}

export default Profile;
