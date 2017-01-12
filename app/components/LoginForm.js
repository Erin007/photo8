//LoginForm.js
import React, { Component } from 'react';
import Button from './common/Button';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input';
import Spinner from './common/Spinner';
import firebase from 'firebase';
import { Text } from 'react-native';

class LoginForm extends Component {

  state = { email: '', password: '', error: '', loading: false}

  onButtonPress(){
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      //if signin doesn't work
      .catch(() =>{
        //try to make an account for the user
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .then(this.verifyUserWithBackend.bind(this))
          .catch(this.onLoginFail.bind(this));
      });

  }

  onLoginFail(){
    this.setState({ error: 'Authenication Failed', loading: false })
  }

  onLoginSuccess() {
    console.log('login was succesful!')
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    })
  }

  verifyUserWithBackend() {
    console.log('verifying user with backend function called')
    firebase.auth().currentUser.getToken(true).then(function(idToken) {
    // Send token to backend via HTTPS

    //if the user exists as a player or organizer in the backend, welcome them

    //if the user doesn't exits as a player or organizer in the backend, ask them for a username


    //save them as a player or organizer depending on which button(make hunt or play) they pick with their username and firebase uid


    }).catch(function(error) {
    // Handle error
    });
  }

  renderButton(){
    if (this.state.loading) {
      return <Spinner size="small"/>
    }
    return(
      <Button onPress={this.onButtonPress.bind(this)}> Log in </Button>
    );
  }

  render(){
    return (
      <Card>
        <CardSection>
          <Input
            label = "Email:"
            placeholder = "user@email.com"
            value = {this.state.email}
            onChangeText = {email => this.setState({ email })}/>
        </CardSection>

        <CardSection>
          <Input
            label = "Password:"
            placeholder = "password"
            secureTextEntry
            value = {this.state.password}
            onChangeText = {password => this.setState({ password })}/>
        </CardSection>

        <Text style= {styles.errorTextStyle}>
          { this.state.error }
        </Text>

        <CardSection>
          { this.renderButton() }
        </CardSection>
      </Card>
    )
  }
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
