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
import styles from '../../components/Styles/shared';
import {
  Button,
  // Card, SocialIcon, List, ListItem, ListView, PricingCard
} from 'react-native-elements';


class Apps extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      ranattr:'ok',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>In the apps app</Text>		
        <Button
          small
          iconRight
          icon={{ name: 'code', }}
          title="Code" />
        <Button
          small
          iconRight
          icon={{ name: 'share-apple',  type: 'evilicon', }}
          title="Share Apple" />
        <Button
          small
          iconRight
          icon={{ name: 'battery-full',  type: 'foundation', }}
          title="Battery Full" />
      </View>
    );
  }
}

export default Apps;