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

class addCaption extends Component {
state = { caption: '', error: '', loading: false, thisplayersteam: '' }



//   .then(response => {
//     console.log("response", response)
//     return this.setState( { submission: response.data })
//   })
//     //if the submission is saved successfully
//   .then(this.submissionSaved.bind(this))
//   //if there was a problem saving the submission
//   .catch((error) => {
//     console.log("The submission caption did not save")
//
//     this.setState({ error: "There was an error with your submission. Please try again.", loading: false })
//
//     console.log("Error:", error)
//   });
// }
  saveCaptionPressed(){
    console.log('>>> Save caption pressed')

    this.getPlayersTeamInfo()

    //make an update request to the backend with the caption info for the submission
    axios.patch('https://treasure-chest-api.herokuapp.com/submissions',{
      directive_id: this.props.directive.id,
      caption: this.state.caption,
      team_id: this.state.thisplayersteam.id
    })
    .then(response => {
      console.log("response", response)
      this.setState({ submission: response.data })
    })
    .catch((error) => {
      console.log("Error:", error)
    });
  }

  getPlayersTeamInfo(){
    console.log(">>> Getting the player's team info")

    //make an axios call to get the team that this player is on for this hunt
    const url = 'https://treasure-chest-api.herokuapp.com/teams/find/' + this.props.hunt.id + '/' + this.props.user.id

    axios.get(url).then( response => {
      console.log(response)
      return this.setState( { thisplayersteam: response.data })
     })
      .catch(function (error) {
        console.log(error);
      });;
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

          <Button>Save Caption</Button>
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
