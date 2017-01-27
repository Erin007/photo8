//Submissions.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import Button from './common/Button';
import huntDetails from './HuntDetails';
import axios from 'axios';
import styles from './styles';

class Submissions extends Component{
  state = { submissions: [], error: '', loading: false, submission: '', team: '', submissionsAwaitingApproval: [], approvedSubmissions: [], deniedSubmissions: []}

  componentWillMount(){

    //call for all of the submissions associated with this hunt
    const url = 'https://treasure-chest-api.herokuapp.com/submissions/hunt/' + this.props.hunt.id

    axios.get(url).then( response => {
      console.log(response)
      return this.setState( { submissions: response.data })
    })
      .then(this.filterSubmissions.bind(this))
      .catch(function (error) {
        console.log(error);
      });;
  }

//navigate to huntDetails
  seeHuntPressed() {
    this._toHuntDetails()
  }

  _toHuntDetails = () => {
    this.props.navigator.push({
      title: 'Hunt Details',
      component: huntDetails,
      passProps: { hunt: this.props.hunt,
                  user: this.props.user}
    });
  }

//helper functions for render
  filterSubmissions(){

    const submissionsToRender = []

    for (i = 0; i < this.state.submissions.length; i++) {
      if (this.state.submissions[i].photo !== ''){
        submissionsToRender.push(this.state.submissions[i])
      }
    }

    if (submissionsToRender.length == 0){
      return(
          <Text style={styles.smallertext}> No one has submitted anything to this hunt yet. </Text>
      )
    }

    const submissionsAwaitingApproval1 = []
    const approvedSubmissions2 = []
    const deniedSubmission3 = []

    for (i = 0; i < submissionsToRender.length; i++) {

      if (submissionsToRender[i].status == 1){
        submissionsAwaitingApproval1.push(submissionsToRender[i])
      }

      if (submissionsToRender[i].status == 2){
        approvedSubmissions2.push(submissionsToRender[i])
      }

      if (submissionsToRender[i].status == 3){
        deniedSubmission3.push(submissionsToRender[i])
      }
    }

    this.setState({ submissionsAwaitingApproval: submissionsAwaitingApproval1, approvedSubmissions: approvedSubmissions2, deniedSubmissions: deniedSubmission3 });
  }

  renderAwaitingSubmissions(){

    if (typeof this.state.submissionsAwaitingApproval !== 'undefined'){

      return this.state.submissionsAwaitingApproval.map(submission =>

        <View style={styles.submissionbox} key={submission.id}>

          <Text style={styles.smallcenteredtext}>❏ {submission.directive_name} </Text>

          <Image
           source={{ uri: submission.photo}}
           style={styles.status1image}/>

           <Text style={styles.smallcenteredtext}> {submission.caption} </Text>

        </View>
      )
    }
  }

  renderApprovedSubmissions(submissions){

    if (typeof this.state.approvedSubmissions !== 'undefined'){

      return submissions.map(submission =>

        <View style={styles.submissionbox} key={submission.id}>

          <Text style={styles.smallcenteredtext}>✔︎ {submission.directive_name} </Text>

          <Image
           source={{ uri: submission.photo}}
           style={styles.status2image}/>

           <Text style={styles.smallcenteredtext}> {submission.caption} </Text>

        </View>
      )
    }
  }

  renderDeniedSubmissions(submissions){

    if (typeof this.state.deniedSubmissions !== 'undefined'){

      return submissions.map(submission =>

        <View style={styles.submissionbox} key={submission.id}>

          <Text style={styles.smallcenteredtext}>❏ {submission.directive_name} </Text>

          <Image
           source={{ uri: submission.photo}}
           style={styles.status3image}/>

           <Text style={styles.smallcenteredtext}> {submission.caption} </Text>

        </View>
      )
    }
  }

  render(){
    return(
      <View style={styles.container}>

        <TouchableOpacity onPress={() =>
          this.seeHuntPressed()}>
          <Text style={styles.huntname}>
            {this.props.hunt.name}
          </Text>
        </TouchableOpacity>

        <Text style={styles.submissionssmalltext}> Submissions </Text>

        <ScrollView style={styles.scrollview}>
          { this.renderAwaitingSubmissions() }
          { this.renderDeniedSubmissions(this.state.deniedSubmissions) }
          { this.renderApprovedSubmissions(this.state.approvedSubmissions) }
        </ScrollView>

      </View>
    )
  }
}

export default Submissions;
