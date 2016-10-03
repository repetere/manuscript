import React, { Component, } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Image, Platform, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import ActivityIndicator from '../../../../app/components/LoadingIndicator';
import Layout from '../../../../app/components/Layout';
import { Button, } from 'react-native-elements';
import EngineComponent from './engines';
import ResourcesComponent from './resources';
import ParsersComponent from './parsers';
import SegmentsComponent from './segments';
if (Platform.OS === 'web') {
  require('babel-polyfill');
}
let layoutData = {
  extensionTitle: 'Pipelines',
  layoutType: 'tabs',
  selectedTab:'engines',
  tabs: {
    engines:{
      name: 'engines',
      title: 'Engines',
      component: EngineComponent, 
      props:{},
    }, 
    resources: {
      name: 'resources',
      title: 'Resources',
      component: ResourcesComponent, 
      props:{},
    }, 
    parsers: {
      name: 'parsers',
      title: 'Parsers',
      component: ParsersComponent, 
      props:{},
    }, 
    segments: {
      name: 'segments',
      title: 'Segments',
      component: SegmentsComponent, 
      props:{},
    },
  },
};

class Pipelines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: props.fetchData,
    };
  }
  componentDidMount() {
    // this.props.requestData('https://pas-dev.promisefinancial.net:8885/pas/data/v2', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'X-Access-Token': this.props.user.jwt_token,
    //     'x-access-token': this.props.user.jwt_token,
    //     // 'Access-Control-Allow-Origin':'*',
    //   },
    //   body: JSON.stringify({
    //     access_token: this.props.user.jwt_token,
    //   }),
    // });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      fetchData: nextProps.fetchData,
    });
  }
  render() {
    return (<Layout {...this.props} layoutData={layoutData} />);
  }
}

export default Pipelines;