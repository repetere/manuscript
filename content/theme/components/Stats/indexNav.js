import React, { Component, } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Image, Platform, Navigator, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import ActivityIndicator from '../../../../app/components/LoadingIndicator';
import Layout from '../../../../app/components/Layout';
import { Button, } from 'react-native-elements';
import ApplicationComponent from './applications';
import CustomerComponent from './customers';
import ItemComponent from './items';
if (Platform.OS === 'web') {
  require('babel-polyfill');
}
let layoutData = {
  extensionTitle: 'PAS Data',
  layoutType: 'tabs',
  selectedTab:'items',
  tabs: {
    applications:{
      name: 'applications',
      title: 'Applications',
      component: ApplicationComponent, 
      props:{},
    }, 
    items:{
      name: 'items',
      title: 'Items',
      component: ItemComponent, 
      props:{},
    }, 
    customers: {
      name: 'customers',
      title: 'Customers',
      component: CustomerComponent, 
      props:{},
    }, 
  },
};

class Stats extends Component {
  constructor(props){
    super(props);
    this.state = {
      fetchData: props.fetchData,
    };
  }
  _configureScene(route, routeStack) {
    console.log('CALLED _configureScene');
    // console.log('configureScene', 'route', route, 'routeStack', routeStack);
    if(route.type === 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
  }
  _renderScene(route, navigator) {
    console.log('CALLED _renderScene', { route, }, { navigator, }, {'renderscene this.props':this.props});
    // console.log('renderScene', 'route', route, 'navigator', navigator);
    
    
    if(route.navPath === 'page1') {
      return <StatsPage1 extensionNavigator={navigator} {...this.props}/>;
    } else if(route.navPath === 'pagetwo') {
      return <StatsPageTwo extensionNavigator={navigator} {...this.props}/>;
    } else  {
      return <StatsHome extensionNavigator={navigator} {...this.props}/>;
    }
  }
  render() {
    // return (<Layout {...this.props} layoutData={layoutData} />);
    return (
      <View style={[ styles.container, { backgroundColor: 'azure' }, {
        alignSelf: 'stretch',
        flex:1,
      }]}>
       <Navigator
        style={{ flex:1, alignSelf: 'stretch',}}
        configureScene={ this._configureScene.bind(this) }
        initialRoute={{ navPath: 'home', }}
        renderScene={ this._renderScene.bind(this) } />  
    </View>
    );
  }
}

class StatsHome extends Component {
  render() {
    console.log('StatsHome this.props', this.props);
    return (<View style={[styles.container, { backgroundColor:'red', },]}>
      <Text style={styles.welcome}>this is stats homepage</Text>
      <Button title="Go To Page two" onPress={
        () => {
          this.props.extensionNavigator.push({ navPath: 'pagetwo', });
        }
      } />
        
    </View>);
  }
}

class StatsPage1 extends Component {
  render() {
    console.log('StatsPage1 this.props', this.props);
    return (<View style={[ styles.container, { backgroundColor: 'blue' }]}>

      <Button title="Go To Home" onPress={
        () => {
          this.props.extensionNavigator.push({ navPath: 'home', });
        }
      } />

      <Text style={styles.welcome}>this is stats page1</Text>
    </View>);
  }
}

class StatsPageTwo extends Component {
  render() {
    console.log('StatsPageTwo this.props', this.props);
    return (<View style={[styles.container,{backgroundColor:'green'}]}>
      <Button title="Go To Page 1" onPress={() => {
        this.props.extensionNavigator.push({ navPath: 'page1', });
      } } />
      <Text style={styles.welcome}>this is stats page two</Text>
    </View>);
  }
}

export default Stats;