import React, { Component, } from 'react';
import { ActivityIndicator, ActivityIndicatorIOS, Platform, } from 'react-native';
const LoadingIndicators = (Platform.OS === 'web') ? ActivityIndicatorIOS : ActivityIndicator;

class Indicator extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return <LoadingIndicators {...this.props} />;
  }
}

export default Indicator;