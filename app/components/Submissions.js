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

class Submissions extends Component{
  state = { submissions: [], error: '', loading: false, submission: '', team: '', submissionsAwaitingApproval: [], approvedSubmissions: [], deniedSubmissions: []}

  componentWillMount(){
    console.log("componentwillmount in submissions")

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
    console.log('seeHunt pressed');
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
    console.log("filtering submissions")
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
    console.log("submissionsAwaitingApproval1", submissionsAwaitingApproval1)
    console.log("approvedSubmissions2", approvedSubmissions2)
    console.log("deniedSubmission3", deniedSubmission3)

    this.setState({ submissionsAwaitingApproval: submissionsAwaitingApproval1, approvedSubmissions: approvedSubmissions2, deniedSubmissions: deniedSubmission3 });
  }

  renderAwaitingSubmissions(){
    console.log("rendering submission awaiting approval")
    if (typeof this.state.submissionsAwaitingApproval !== 'undefined'){

      return this.state.submissionsAwaitingApproval.map(submission =>

        <View style={styles.submissionbox} key={submission.id}>

          <Text style={styles.caption}>❏ {submission.directive_name} </Text>

          <Image
           source={{ uri: submission.photo}}
           style={styles.status1}/>

           <Text style={styles.caption}> {submission.caption} </Text>

        </View>
      )
    }
  }

  renderApprovedSubmissions(submissions){
    console.log("rendering approved submissions")
    if (typeof this.state.approvedSubmissions !== 'undefined'){

      return submissions.map(submission =>

        <View style={styles.submissionbox} key={submission.id}>

          <Text style={styles.caption}>✔︎ {submission.directive_name} </Text>

          <Image
           source={{ uri: submission.photo}}
           style={styles.status2}/>

           <Text style={styles.caption}> {submission.caption} </Text>

        </View>
      )
    }
  }

  renderDeniedSubmissions(submissions){
    console.log("rendering denied submissions")
    if (typeof this.state.deniedSubmissions !== 'undefined'){

      return submissions.map(submission =>

        <View style={styles.submissionbox} key={submission.id}>

          <Text style={styles.caption}>❏ {submission.directive_name} </Text>

          <Image
           source={{ uri: submission.photo}}
           style={styles.status3}/>

           <Text style={styles.caption}> {submission.caption} </Text>

        </View>
      )
    }
  }

  render(){
    return(
      <View style={styles.container}>

        <TouchableOpacity onPress={() =>
          this.seeHuntPressed()}>
          <Text style={styles.name}>
            {this.props.hunt.name}
          </Text>
        </TouchableOpacity>

        <Text style={styles.smalltext}> Submissions </Text>

        <ScrollView style={styles.scrollview}>
        { this.renderAwaitingSubmissions() }
        { this.renderDeniedSubmissions(this.state.deniedSubmissions) }
        { this.renderApprovedSubmissions(this.state.approvedSubmissions) }
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  name: {
    fontSize: 32,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Pacifico'
  },
  smalltext: {
    fontSize: 25,
    textAlign: 'center',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -20,
    fontFamily: 'Chalkboard SE'
  },
  smallertext: {
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE',
    color: '#DCDCDC',
  },
  submissionbox:{
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  scrollview:{
    height: 400,
    marginTop: -40
  },
  caption: {
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
    fontFamily: "Chalkboard SE"
  },
  status1:{
    borderColor: '#DCDCDC',
    borderWidth: 5,
    margin: 2,
    height: 300,
    width: 300,
    borderRadius: 5,
    alignSelf: 'center'
  },
  status2:{
    borderColor: '#24AE62',
    borderWidth: 5,
    margin: 2,
    height: 300,
    width: 300,
    borderRadius: 5,
    alignSelf: 'center'
  },
  status3:{
    borderColor: '#991c1c',
    borderWidth: 5,
    margin: 2,
    height: 300,
    width: 300,
    borderRadius: 5,
    alignSelf: 'center'
  },

})

export default Submissions;
