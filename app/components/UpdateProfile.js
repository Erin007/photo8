//UpdateProfile.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  SideMenu,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import Input from './common/Input';
import Button from './common/Button';
import Spinner from './common/Spinner';
import axios from 'axios';
import welcomeCopy from './WelcomeCopy';
import Profile from './Profile';

class UpdateProfile extends Component {

  state = { error: '', loading: false, user: this.props.user, username: this.props.user.username, location: this.props.user.location, bio: this.props.user.bio }

  renderButton(){

    if (this.state.loading) {
      return <Spinner size="small"/>
    }
    return(
      <Button onPress={this.onButtonPress.bind(this)}> Update </Button>
    );
  }

  onButtonPress(){

    const { username } = this.state;

    this.setState({ error: '', loading: true });

    //send the updated info to the backend
    const url = 'https://treasure-chest-api.herokuapp.com/users/' + this.props.user.id

    axios.patch(url, {
      username: this.state.username,
      location: this.state.location,
      bio: this.state.bio
    })
    .then(response => {
      console.log("response", response)
      return this.setState( { user: response.data, loading: false })
    })
      //if the user is saved successfully
    .then(this.userUpdated.bind(this))
    //if there was a problem saving the user
    .catch((error) => {
      console.log("The username did not save")
      this.setState({ error: "There was an error with your information. Please try again.", loading: false })
      console.log("Error:", error)
    });
  }

  userUpdated(){
    this.setState({
      bio: '',
      location: '',
      username: '',
      loading: false,
      error: ''
    })
    this._toProfile()
  }

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
                   user : this.state.user}
    });
  }

//navigate back to the user's profile
  _toProfile = () => {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: { hunt : this.props.hunt,
                   user : this.state.user,
                   player: this.state.user}
    });
  }

  render(){
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.toHome.bind(this)}>
          <Text style={styles.welcome}>
             Snapenger Hunt
          </Text>
        </TouchableOpacity>

        <KeyboardAvoidingView behavior = 'padding'>
            <View>
            <Text style={styles.text}>username</Text>

            <Input
                label = ""
                placeholder = "username"
                value = {this.state.username}
                onChangeText = {username => this.setState({ username })}/>

            <Text style={styles.text}>location</Text>

            <Input
                label = ""
                placeholder = "location"
                value = {this.state.location}
                onChangeText = {location => this.setState({ location })}/>

            <Text style={styles.text}>bio</Text>

            <Input
                label = ""
                placeholder = "bio"
                value = {this.state.bio}
                onChangeText = {bio => this.setState({ bio })}/>

            <Text style={styles.text}>picture</Text>

            <Image
              source={require('../assets/ic_photo_camera_36pt.png')}
              style={styles.camerabutton}
            />

            <Text style= {styles.errorTextStyle}>
              { this.state.error }
            </Text>

            { this.renderButton() }
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cce5e5',
    marginTop: 30,
    paddingBottom: 10
  },
  camerabutton:{
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 5,
    fontFamily: "Chalkboard SE",
    color:  '#353839',
  },
  errorTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'red',
    fontFamily: "Chalkboard SE"
  },
  welcome: {
    fontSize: 42,
    textAlign: 'center',
    fontFamily: 'Pacifico',
    margin: 5,
    marginTop: 10,
    padding: 5,
    color: '#006666',
    textShadowColor: 'white',
    textShadowOffset:( {width: 1, height: 1} ),
    textShadowRadius: 1
  },
};

export default UpdateProfile;
