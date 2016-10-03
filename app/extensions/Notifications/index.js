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


class Notifications extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      ranattr:'ok',
    };
  }
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.heading }>In the Notifications app</Text>		
        <Button
          small
          icon={{name: 'envira', type: 'font-awesome'}}
          title='SMALL WITH RIGHT ICON' />

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

export default Notifications;