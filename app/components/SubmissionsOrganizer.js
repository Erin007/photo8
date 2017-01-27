//SubmissionsOrganizer.js

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

class SubmissionsOrganizer extends Component{
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

  approveSubmission(submission){

    //patch to the back to change the  submission status to 2
    const url = 'https://treasure-chest-api.herokuapp.com/submissions/' + submission.id

    axios.patch(url, {
      status: 2,
    })
    .then(response => {
      console.log("response from changing submission status to 2", response)
    this.setState({ submission: response.data })
    })
    .catch((error) => {
      console.log("Error from changing submission status to 2", error)
      this.setState({ error: "There was an error. Please try again.", loading: false })
    });

    //patch to the directive to change complete to true
    const url2 = 'https://treasure-chest-api.herokuapp.com/directives/' + submission.directive_id

    axios.patch(url2, {
      complete: true,
    })
    .then(response => {
      console.log("response from changing complete to true for the directive", response)
    this.setState({ submission: response.data })
    })
    .catch((error) => {
      console.log("Error from changing the directive complete to true", error)
      this.setState({ error: "There was an error. Please try again.", loading: false })
    });

    //get the team for the this directive from the backend so you can set state and increment the points
    const url3 = 'https://treasure-chest-api.herokuapp.com/teams/' + submission.team_id

    axios.get(url3).then(response => {
      console.log("response from getting the team", response)
    this.setState({ team: response.data })
    })
    .catch((error) => {
      console.log("Error from getting the team", error)
      this.setState({ error: "There was an error. Please try again.", loading: false })
    });

    //determine what the new team point value should be
    const newPoints = this.state.team.points + 1
    //****** CHANGE 1 to point value in added features *********////

    //patch to team to give them points for this directive
    axios.patch(url3, {
      points: newPoints,
    })
    .then(response => {
      console.log("response from setting the points in team", response)
    this.setState({ submission: response.data })
    })
    .catch((error) => {
      console.log("Error from setting the points in team", error)
      this.setState({ error: "There was an error. Please try again.", loading: false })
    });
    //re-call to backend for the updated list of submissions and re-render
    this.componentWillMount()
  }

  denySubmission(submission){
    //patch to this submission to change the status to 3
    const url = 'https://treasure-chest-api.herokuapp.com/submissions/' + submission.id

    axios.patch(url, {
      status: 3,
    })
    .then(response => {
      console.log("response", response)
    this.setState({ submission: response.data })
    })
    .catch((error) => {
      console.log("Error:", error)
      this.setState({ error: "There was an error. Please try again.", loading: false })
    });
    //re-call to backend for the updated list of submissions and re-render
    this.componentWillMount()
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

deleteSubmissionPressed(submission){
  //delete the submission from the backend
  const url = 'https://treasure-chest-api.herokuapp.com/submissions/' + submission.id

  axios.delete(url)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  //fetch the new submissions list and change the state to reflect the deletion
  this.componentWillMount()
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

          <View style={styles.deletebox}>
            <TouchableOpacity style={styles.delete} onPress={() => this.deleteSubmissionPressed(submission)}>
              <Text>✘</Text>
            </TouchableOpacity>

            <Text style={styles.smallesttext}>❏ {submission.directive_name} </Text>
          </View>

          <Image
           source={{ uri: submission.photo}}
           style={styles.status1image}/>

           <Text style={styles.smallcenteredtext}> {submission.caption} </Text>

          <View style={styles.buttonbox}>
            <TouchableOpacity onPress={() => this.denySubmission(submission)}>
             <Text style={styles.deny}>✘</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.approveSubmission(submission)}>
             <Text style={styles.check}>✔︎</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  renderApprovedSubmissions(submissions){

    if (typeof this.state.approvedSubmissions !== 'undefined'){

      return submissions.map(submission =>

        <View style={styles.submissionbox} key={submission.id}>

          <View style={styles.deletebox}>
            <TouchableOpacity style={styles.delete} onPress={() => this.deleteSubmissionPressed(submission)}>
              <Text>✘</Text>
            </TouchableOpacity>

            <Text style={styles.smallesttext}>❏ {submission.directive_name} </Text>
          </View>

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

          <View style={styles.deletebox}>
          
            <TouchableOpacity style={styles.delete} onPress={() => this.deleteSubmissionPressed(submission)}>
              <Text>✘</Text>
            </TouchableOpacity>

            <Text style={styles.smallcenteredtext}>❏ {submission.directive_name} </Text>
          </View>

          <Image
           source={{ uri: submission.photo}}
           style={styles.status3image}/>

           <Text style={styles.smallcenteredtext}> {submission.caption} </Text>

           <TouchableOpacity onPress={() => this.approveSubmission(submission)}>
            <Text style={styles.check2}>✔︎</Text>
           </TouchableOpacity>

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

export default SubmissionsOrganizer;
