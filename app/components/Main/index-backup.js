/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import TestPage from '../TestPage';
import NavigationExample from '../NavigationExample'; 
//https://medium.com/@dabit3/react-native-navigator-navigating-like-a-pro-in-react-native-3cb1b6dc1e30#.a512hghmd
//https://facebook.github.io/react-native/docs/using-navigators.html
// https://facebook.github.io/react-native/docs/navigation.html
// https://rnplay.org/apps/-
// http://stackoverflow.com/questions/37395749/react-native-dynamic-listview-master-detail
import {
  Button,Card, SocialIcon, List, ListItem, ListView, PricingCard
} from 'react-native-elements';


class Main extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      ranattr:'ok',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Now Main to React Native oh finally ?!
        </Text>
        <TestPage/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Main;