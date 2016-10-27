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
  require('whatwg-fetch');
  require('babel-polyfill');
  require('./web/custom_node_modules/react-native-vector-icons/css/stylesheet.css');
  let app = document.createElement('div');
  let metaViewport = document.createElement('meta');
  document.body.setAttribute('id', 'NativeCMS');
  metaViewport.setAttribute('name', 'viewport');
  metaViewport.setAttribute('content', 'width=device-width,initial-scale=1');
  document.body.appendChild(app);
  document.head.appendChild(metaViewport);
  AppRegistry.runApplication('Main', {
    rootTag: app,
  });
}
