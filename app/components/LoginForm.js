//LoginForm.js
import React, { Component } from 'react';
import Button from './common/Button';
import Input from './common/Input';
import Spinner from './common/Spinner';
import firebase from 'firebase';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

class LoginForm extends Component {

  state = { email: '', password: '', error: '', loading: false, user: '', username: ''}

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
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail(){
    console.log('Login Fail called')
    this.setState({ error: 'Authenication Failed', loading: false })
  }

  onLoginSuccess() {
    console.log('Login Success called')
    this.setState({
      email: '',
      password: '',
      username: '',
      loading: false,
      error: ''
    })
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
      <KeyboardAvoidingView behavior = 'padding'>
        <ScrollView style={styles.scrollview}>

            <Input
              label = ""
              placeholder = "email"
              value = {this.state.email}
              onChangeText = {email => this.setState({ email })}/>

            <Input
              label = ""
              placeholder = "password"
              secureTextEntry
              value = {this.state.password}
              onChangeText = {password => this.setState({ password })}/>

          <Text style= {styles.errorTextStyle}>
            { this.state.error }
          </Text>

          { this.renderButton() }

        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  scrollview:{
    marginTop: 25
  },
};

export default LoginForm;
