import React, { Component, } from 'react';
import { View, } from 'react-native';
import ActivityIndicator from './index';
import styles from '../Styles/shared';

class LoadingView extends Component{
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          style={styles.viewIndicator}
          size="large"
          />
      </View>
    );
  }
}

export default LoadingView;