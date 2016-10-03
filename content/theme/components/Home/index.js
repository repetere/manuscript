/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes, } from 'react';
import { StyleSheet, Text, View, Platform, Image, ScrollView, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import ActivityIndicator from '../../../../app/components/LoadingIndicator';
import 'babel-polyfill';
import { Button, List, ListItem, PricingCard, } from 'react-native-elements';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: props.fetchData,
    };
    console.log('CUSTOM HOME this.props', this.props);
  }
  componentDidMount() {
  
  }
  componentWillReceiveProps(nextProps) {
    console.log('HOME componentWillRecieveProps nextProps', nextProps);
    this.setState({
      fetchData: nextProps.fetchData,
    });
  }
  render() {
    return (
      <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={styles.scrollViewStandardContentContainer}>
        <Text style={styles.welcome}>
          Custom Home Page
        </Text>
        <Text style={styles.instructions}>
          URL: {this.state.fetchData.url}
        </Text>
        <Text style={styles.instructions}>
          Data length: {(this.state.fetchData.json) ? this.state.fetchData.json.length : 0}
        </Text>
      
        <PricingCard
          color='#4f9deb'
          title='Free'
          price='$0'
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{
            title: 'GET STARTED', icon: 'flight-takeoff',
          }}
          />
        <Text>grid view</Text>
        <Text>grid view</Text>
        <Text>grid view</Text>
        <Text>grid view</Text>
      
        <PricingCard
          color='#4f9deb'
          title='Free'
          price='$0'
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{
            title: 'GET STARTED', icon: 'flight-takeoff',
          }}
          />
        <Text>grid view</Text>
        <Text>grid view</Text>
        <Text>grid view</Text>
        <Text>grid view</Text>
      
        <PricingCard
          color='#4f9deb'
          title='Free'
          price='$0'
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{
            title: 'GET STARTED', icon: 'flight-takeoff',
          }}
          />
        <Text>grid view</Text>
        <Text>grid view</Text>
        <Text>grid view</Text>
        <Text>grid view</Text>
      
        <PricingCard
          color='#4f9deb'
          title='Free'
          price='$0'
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{
            title: 'GET STARTED', icon: 'flight-takeoff',
          }}
          />
        <Text>grid view</Text>
        <Text>grid view</Text>
        <Text>grid view</Text>
        <Text>grid view</Text>
      
        <PricingCard
          color='#4f9deb'
          title='Free'
          price='$0'
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{
            title: 'GET STARTED', icon: 'flight-takeoff',
          }}
          />
        <Text>grid view</Text>
        <Text>grid view</Text>
        <Text>grid view</Text>
        <Text>grid view</Text>
      
        <PricingCard
          color='#4f9deb'
          title='Free'
          price='$0'
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{
            title: 'GET STARTED', icon: 'flight-takeoff',
          }}
          />
        <Text>grid view</Text>
        <Text>grid view</Text>
        <Text>grid view</Text>
        <Text>grid view</Text>
      </ScrollView>
    );
  }
}

export default Home;