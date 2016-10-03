/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Navigator, } from 'react-native';
import Tabs from 'react-native-tabs';
import configExtensions from '../../../content/config/extensions.json';
import StandardExtensions from './extensions';
import styles from '../Styles/shared';
import TabIcon from '../AppTabs/TabIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import capitalize from 'capitalize';
// console.log(StandardExtensions)
class Main extends Component{ 
  constructor(props){
    super(props);
    let tabs = configExtensions.standard.concat();//.splice(3, 0, configExtensions.more);
    tabs.splice(4, 0, configExtensions.more).slice(0,4);
    this.state = { 
      page:'home',
      tabBarExtensions: tabs.slice(0,5),
    };
  }
  _onSelect(el){
    console.log('on select: el.props',el.props);
    // this._navigate({ name: el.props.name, });
    this.setState({
      page:el.props.name,
    });
  }
  _renderScene(route, navigator) {
    console.log('CALLED _renderScene');
    // console.log('renderScene', 'route', route, 'navigator', navigator);
    return <route.component navigator={navigator} {...route.passProps}/>;
  }
  _configureScene(route, routeStack) {
    console.log('CALLED _configureScene');
    // console.log('configureScene', 'route', route, 'routeStack', routeStack);
    if(route.type === 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
  }
  render() {
    // console.log('this.state',this.state)
    let self = this;
    return (
        <Navigator
      	  style={{ flex:1, }}
        	configureScene={ this._configureScene }
          initialRoute={{ component: StandardExtensions.Home, }}
          renderScene={ this._renderScene } />
        
    );
  }
}


export default Main;