//index.ios.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

import welcome from './components/Welcome';

class photo8 extends Component {

  render() {
    return (
      <NavigatorIOS
          initialRoute={{
            component: welcome,
            title: 'Home',
          }}
          style={{flex: 1}}
        />
      );
    }
  }


export default photo8;
