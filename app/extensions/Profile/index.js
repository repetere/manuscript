/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative, { StyleSheet, ScrollView, View, Text, Platform, ListView, AsyncStorage, } from 'react-native';
import styles from '../../components/Styles/shared';
import { Button, List, ListItem, } from 'react-native-elements';  // Card, SocialIcon, ListView, PricingCard
// import * as Animatable from 'react-native-animatable';
// const ScrollView = Animatable.createAnimatableComponent(ReactNative.ScrollView);
import constants from '../../constants';
// import { onLayoutUpdate, setLayoutHandler } from '../../util/dimension';


class Profile extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      ranattr:'ok',
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log('profile',{nextProps})   
  }
  componentDidMount() {
    // setLayoutHandler.call(this);
    Promise.all([
      AsyncStorage.getItem(constants.jwt_token.TOKEN_NAME),
      AsyncStorage.getItem(constants.jwt_token.TOKEN_DATA),
      AsyncStorage.getItem(constants.jwt_token.PROFILE_JSON),
    ])
      .then(results_asyncstorage => {
      console.log('fetched data for profile')
      this.setState({ results_asyncstorage, user_props: this.props.user, });
    })
    .catch(err => { console.log('profile err', err); });  
  }
  render() {
    console.log('PROFILE RENDER this.state', this.state);
    return (
      <View
        // onLayout={onLayoutUpdate.bind(this)}
        style={[styles.stretchBox, styles.scrollViewWrapperContainer, styles.statusBarPadding, ]}>
        <ScrollView style={styles.stretchBox } contentContainerStyle={ { paddingVertical: 20,position:'relative' }}>
          <Button
            title="Log out"
            onPress={() => {
              console.log('pressed button')
              this.props.logoutUser()
            }}
            />
   
        <Text>results_asyncstorage2: {JSON.stringify(this.state.results_asyncstorage,null,2)}</Text>
        <Text>user_props: {JSON.stringify(this.state.user_props,null,2)}</Text>
        </ScrollView>
      </View>
    );
  }
}

export default Profile;