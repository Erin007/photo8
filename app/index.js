//index.ios.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

import welcome from './Welcome';

class photo8 extends Component {

  render() {
    return (
      <NavigatorIOS
          initialRoute={{
            component: welcome,
            title: 'Welcome',
          }}
          style={{flex: 1}}
        />
      );
    }
  }


export default photo8;
