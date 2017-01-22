//AddCaption.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
Image } from 'react-native';
import Button from './common/Button';
import Input from './common/Input';
import axios from 'axios';
import DirectiveShow from './DirectiveShow';

class addCaption extends Component {
state = { caption: '', error: '', loading: false, submission: '' }

  saveCaptionPressed(){
    console.log('>>> Save caption pressed')

    //make an update request to the backend with the caption info for the submission
    console.log("caption", this.state.caption)
    console.log("submission", this.props.submission)

    const url = 'https://treasure-chest-api.herokuapp.com/submissions/' + this.props.submission.id

    axios.patch(url,{
      caption: this.state.caption,
    })
    .then(response => {
      console.log("response", response)
      this.setState({ submission: response.data })
    })
    .then(this.submissionUpdated.bind(this))
    .catch((error) => {
      console.log("Error:", error)
      this.setState({ error: "There was an error with your submission. Please try again.", loading: false })
    });
  }

  submissionUpdated(){
    //clear the form
    this.setState({
      caption:'',
      loading: false,
      error: ''
    })
    this._toDirectiveShow()
  }

  _toDirectiveShow = () => {
    this.props.navigator.push({
      title: 'Directive',
      component: DirectiveShow,
      passProps: { submission: this.state.submission,
                   directive: this.props.directive,
                   hunt: this.props.hunt,
                   user: this.props.user },
    });
  }


  render(){
    return(
      <View style={styles.container}>

        <Text style={styles.huntname}> {this.props.hunt.name}</Text>

        <Text style={styles.directive}> { this.props.directive.name }
        </Text>

        <View style={styles.captionbox}>
          <Input
            label = ""
            placeholder = "caption"
            value = {this.state.caption}
            onChangeText = {caption => this.setState({ caption })}
            />
        </View>

          <Button onPress={this.saveCaptionPressed.bind(this)}>Save Caption</Button>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  captionbox: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20
  },
  huntname: {
    marginTop: 65,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Pacifico'
  },
  directive: {
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 20,
    fontFamily: "Chalkboard SE"
  },
});

export default addCaption;
