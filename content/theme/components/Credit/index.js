import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, } from 'react-native-elements';
import constants from '../../constants';

class Credit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: props.fetchData,
    };
  }
  // componentDidMount() { 
  //   this.getPipelineIndex(); 
  // }
  // getPipelineIndex() {
  //   this.props.requestData(constants.pipelines.all.BASE_URL+constants.pipelines.Credit.GET_INDEX, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'X-Access-Token': this.props.user.jwt_token,
  //       // 'x-access-token': this.props.user.jwt_token,
  //       // 'Access-Control-Allow-Origin':'*',
  //     },
  //     // body: JSON.stringify({
  //     //   access_token: this.props.user.jwt_token,
  //     // }),
  //   });
  // }
  // componentWillReceiveProps(nextProps) {
  //   console.log('Parsers componentWillRecieveProps nextProps', nextProps);
  //   this.setState({
  //     fetchData: nextProps.fetchData,
  //   });
  // }
  render() {
    console.log('CREDIT COMPONENT RENDER');
    // console.log('Credit this.state.fetchData', this.state.fetchData);
    let loadingView = (<LoadingView/>);
    let loadedDataView = (
      <View style={styles.container}>
        <Text style={styles.welcome}>Credit</Text>		
      </View>
    );
    let errorView = (
      <View style={styles.container}>
        <Text style={styles.welcome}>ERROR</Text>		
      </View>
    );
    // if (this.state.fetchData.url === constants.pipelines.all.BASE_URL + constants.pipelines.Credit.GET_INDEX) { 
    //   if (this.state.fetchData.error) {
    //     return errorView;
    //   } else {
    //     return loadedDataView; 
    //   }
    // } else {
    //   return loadingView;
    // }
    return loadedDataView;     
  }
}

export default Credit;