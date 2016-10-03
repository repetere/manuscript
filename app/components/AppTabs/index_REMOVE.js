import React, { Component } from 'react';
import {
 StyleSheet,
  View,
  ScrollView,
  Navigator,
  TouchableHighlight
} from 'react-native';
import {
  Text,
  Button,
  //  SocialIcon, List, ListItem, ListView, PricingCard
} from 'react-native-elements';
import Tabs from 'react-native-tabs';
import styles from '../Styles/shared';

class AppTabs extends Component{ 
  constructor(props){
    super(props);
    this.state = {page:'second'};
  }
  render() {
    return (
      <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
            selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
          <Text name="first">First</Text>
          <Text name="second" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Second</Text>
          <Text name="third">Third</Text>
          <Text name="fourth" selectedStyle={{color:'green'}}>Fourth</Text>
          <Text name="fifth">Fifth</Text>
      </Tabs>
    );
  }
}


export default AppTabs;