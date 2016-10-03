/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  Text,
  View,
  Platform
} from 'react-native';
import React, { Component } from 'react';
import styles from '../../components/Styles/shared';
import {
  Button,
  // Card, SocialIcon, List, ListItem, ListView, PricingCard
} from 'react-native-elements';


class Settings extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      ranattr:'ok',
    };
  }
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.heading }>In the Settings app</Text>		
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

export default Settings;