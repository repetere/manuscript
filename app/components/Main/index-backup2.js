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
import {
  Button, SocialIcon, List, ListItem, ListView, PricingCard
} from 'react-native-elements';


const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]


class Main extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      ranattr:'ok',
      dataSource:list,
    };
  }
  renderRow (rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={sectionID}
        title={rowData.name}
        subtitle={rowData.subtitle}
        avatar={rowData.avatar_url}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state)}</Text>
        <PricingCard
          color='red'
          title='Free'
          price='$0'
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
        />
        <Text style={styles.welcome}>
          Now Main to React Native oh finally ?!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js and hot reloading 111
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menuss
        </Text>
        <Button
          title='BUTTON' />
        <Button
          raised
          icon={{name: 'cached'}}
          title='RAISED WITH ICON' />

        <Button
          small
          iconRight
          icon={{name: 'code', type: 'font-awesome'}}
          title='SMALL WITH RIGHT ICON' />

        <Button
          small
          icon={{name: 'envira', type: 'font-awesome'}}
          title='SMALL WITH RIGHT ICON' />

        <Button
          small
          icon={{name: 'squirrel', type: 'octicon', style: {marginLeft: 20}}}
          title='OCTICON' />
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