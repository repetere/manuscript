/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
} from 'react-native';
import Main from './app/components/Main';

AppRegistry.registerComponent('Main', () => Main);
if (Platform.OS == 'web') {
  require('./web/custom_node_modules/react-native-vector-icons/css/stylesheet.css');
  var app = document.createElement('div');
  document.body.setAttribute('id', 'NativeCMS');
  document.body.appendChild(app);
  AppRegistry.runApplication('Main', {
    rootTag: app,
  });
}
