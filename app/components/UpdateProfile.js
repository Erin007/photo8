//UpdateProfile.js
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
import Input from './common/Input';
import Button from './common/Button';
import Spinner from './common/Spinner';
import welcome from './Welcome';
import axios from 'axios';

class UpdateProfile extends Component {

  state = { error: '', loading: false, user: this.props.user, username: '' }

  renderButton(){
    console.log("rendering button on update profile")
    console.log("this.props on update profile", this.props)
    if (this.state.loading) {
      return <Spinner size="small"/>
    }
    return(
      <Button onPress={this.onButtonPress.bind(this)}> Update </Button>
    );
  }

  onButtonPress(){
    console.log('update pressed')
    const { username } = this.state;

    this.setState({ error: '', loading: true });

    //send the updated info to the backend
    const url = 'https://treasure-chest-api.herokuapp.com/users/' + this.props.user[0].id
    console.log(this.props.user[0].id)

    axios.patch(url, {
      username: this.state.username
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
    console.log("the user's information was updated")
    this.setState({
      email: '',
      password: '',
      username: '',
      loading: false,
      error: ''
    })
  }

  render(){
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>
           Snapenger Hunt
        </Text>

        <ScrollView>
          <Text style={styles.text}> What would you like your username to be? </Text>

          <Input
              label = ""
              placeholder = "username"
              value = {this.state.username}
              onChangeText = {username => this.setState({ username })}/>

          <Text style= {styles.errorTextStyle}>
            { this.state.error }
          </Text>

          { this.renderButton() }

        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 40,
    textAlign: 'center'
  },
  text: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 5,
    fontFamily: "Chalkboard SE"
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 5,
    paddingTop: 10,
    fontFamily: 'Pacifico',
    justifyContent: 'flex-start'
  },
};

export default UpdateProfile;
