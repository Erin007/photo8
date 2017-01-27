//styles.js

import React, { Component } from 'react';
import {AppRegistry, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#cce5e5',
    marginTop: 35
  },
  scrollview:{
    height: 200,
    // borderBottomWidth: 3,
  },
  content:{
    marginTop: 25,
  },
  welcome: {
    fontSize: 42,
    textAlign: 'center',
    fontFamily: 'Pacifico',
    margin: 5,
    padding: 5,
    marginBottom: 30,
    color: '#006666',
    textShadowColor: 'white',
    textShadowOffset:( {width: 1, height: 1} ),
    textShadowRadius: 1
  },
  huntname:{
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Pacifico',
    margin: 5,
    padding: 5,
    marginBottom: 8,
    color: '#006666',
    textShadowColor: 'white',
    textShadowOffset:( {width: 1, height: 1} ),
    textShadowRadius: 1
  },
  smalltext: {
    fontSize: 25,
    textAlign: 'left',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    // marginTop: -20,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
  },
  smallertext: {
    fontSize: 20,
    textAlign: 'left',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    // marginTop: -50,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
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
  smallesttext: {
    fontSize: 16,
    textAlign: 'left',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    // marginTop: -50,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
  },
  tinytext: {
    fontSize: 14,
    textAlign: 'left',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    // marginTop: -50,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
  },
  smallcenteredtext: {
    fontSize: 16,
    textAlign: 'center',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
  },
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
    fontFamily: "Chalkboard SE"
  },
  listitem:{
    fontSize: 18,
    fontFamily: 'Chalkboard SE',
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#008080',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 15,
    width: 275,
    backgroundColor: 'white',
    color:  '#353839',
  },
  listitemsmall:{
    fontSize: 16,
    fontFamily: 'Chalkboard SE',
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#008080',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 15,
    width: 275,
    backgroundColor: 'white',
    color:  '#353839',
  },
  listitemsmallO:{
    fontSize: 16,
    fontFamily: 'Chalkboard SE',
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#006666',
    backgroundColor: 'white',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
    width: 245,
    color:  '#353839',
  },
//login form
  loginform: {
    marginTop: 50
  },
//profile page styling
  profileimage: {
    marginTop: -10,
    height: 150,
    width: 150,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: '#353839',
    alignSelf: 'center',
    marginLeft: 15
  },
  profilebox:{
    marginTop: 30,
    marginBottom: 30,
    marginLeft: -30
  },
//update profile
  camerabutton:{
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10
  },
  updateprofile:{
    marginTop: -25
  },
//HuntListPlayer & HuntListOrganizer
  bottombutton:{
    paddingBottom: 20,
  },
//huntDetails
  huntdetails: {
    flex: 1,
    backgroundColor: '#cce5e5',
    marginTop: 35,
  },
//playersonTeam
  teambutton: {
    marginBottom: 30
  },
  scrollviewplayer:{
    height: 150,
    marginTop: -15,
    marginBottom: 50,
    // borderBottomWidth: 3,
  },
//directive show
  status1image:{
    borderColor: '#353839',
    borderWidth: 5,
    margin: 2,
    height: 250,
    width: 250,
    borderRadius: 5,
    alignSelf: 'center',
  },
  status2image:{
    borderColor: '#24AE62',
    borderWidth: 5,
    margin: 2,
    height: 250,
    width: 250,
    borderRadius: 5,
    alignSelf: 'center'
  },
  status3image:{
    borderColor: '#991c1c',
    borderWidth: 5,
    margin: 2,
    height: 250,
    width: 250,
    borderRadius: 5,
    alignSelf: 'center'
  },
  placeholder: {
    margin: 2,
    height: 250,
    width: 250,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: '#008080',
    alignSelf: 'center'
  },
  status1:{
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 5,
    // marginTop: -5,
    fontFamily: "Chalkboard SE",
    color: '#353839',
  },
  status2:{
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 5,
    marginBottom: 5,
    fontFamily: "Chalkboard SE",
    color: '#24AE62',
  },
  status3:{
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 5,
    marginTop: -5,
    fontFamily: "Chalkboard SE",
    color: '#b22121',
  },
//add caption
  captionbox: {
    marginTop: 30
  },
//photo select
  image: {
    width: 275,
    height: 275,
    margin: 10,
    borderRadius: 5,
    alignSelf: 'center'
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
//submissions
  submissionbox:{
    padding: 5,
    margin: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  submissionssmalltext: {
    fontSize: 25,
    textAlign: 'left',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -13,
    fontFamily: 'Chalkboard SE',
    color:  '#353839',
  },
//organizer
  x:{
    width: 30,
    height: 30,
    backgroundColor: "#006666",
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#167c89',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor:'#006666',
    marginTop: 12,
  },
  directivebox: {
    flexDirection: 'row',
    marginBottom: 5,
    width: 300
  },
  plus:{
    width: 40,
    height: 40,
    backgroundColor: '#006666',
    paddingTop: 12,
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#006666',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor:'#006666',
    marginTop: 12,
    alignItems: 'center',
  },
  plussymbol: {
    color: 'white'
  },
  deletebox: {
    flexDirection: 'row',
    marginBottom: 5,
    width: 280
  },
  delete:{
    width: 30,
    height: 30,
    padding: 5,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 5,
  },
  check:{
    fontSize: 25,
    width: 30,
    height: 30,
    backgroundColor: '#24AE62',
    paddingLeft: 7,
    alignSelf: 'center',
    elevation: 1,
    color: '#353839',
    borderColor: '#353839',
    borderWidth: 2
  },
  check2:{
    fontSize: 25,
    width: 30,
    height: 30,
    backgroundColor: '#24AE62',
    paddingLeft: 7,
    alignSelf: 'center',
    elevation: 1,
    color: '#353839',
    borderColor: '#353839',
    borderWidth: 2
  },
  buttonbox:{
    flexDirection: 'row',
  },
  center: {
    alignSelf: 'center'
  },
  deny:{
    fontSize: 25,
    width: 30,
    height: 30,
    backgroundColor: '#b22121',
    paddingLeft: 5,
    alignSelf: 'center',
    elevation: 1,
    color: '#353839',
    marginLeft: 65,
    marginRight: 65,
    borderColor: '#353839',
    borderWidth: 2
  },
  directiveshow: {
    marginTop: -10
  },
  addbutton: {
    marginBottom: 10
  },
  smush:{
    height: 320
  },
  smush2:{
    height: 225,
  },
  smush3:{
    height: 175,
  },
});

module.exports = styles
