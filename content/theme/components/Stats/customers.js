import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ListView, Image, Dimensions, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import Icons from '../../../../app/components/Icons';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, } from 'react-native-elements';
import constants from '../../constants';

function getDataSource() {
  return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
}

class Customers extends Component {
  constructor(props){
    super(props);
    let ds = getDataSource();
    this.state = {
      fetchData: props.fetchData,
      customerData: {
        customerpages: 1,
        customers: ds.cloneWithRows([ { title: 'title' }]),
        customerscount: 1,
      },
    };
  }
  componentDidMount() { 
    this.getPipelineIndex(); 
  }
  getPipelineIndex() {
    this.props.requestData(constants.pipelines.all.BASE_URL+constants.pipelines.customers.GET_INDEX, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.user.jwt_token,
        // 'x-access-token': this.props.user.jwt_token,
        // 'Access-Control-Allow-Origin':'*',
      },
      // body: JSON.stringify({
      //   access_token: this.props.user.jwt_token,
      // }),
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('Parsers componentWillRecieveProps nextProps', nextProps);
    let ds = getDataSource();
    if (nextProps.fetchData.json) {
      
      this.setState({
        fetchData: nextProps.fetchData,
        customerData: {
          customerpages: nextProps.fetchData.json.customerpages,
          customers: ds.cloneWithRows(nextProps.fetchData.json.customers),
          customerscount: nextProps.fetchData.json.customerscount,
        },
      });
    }
  }
  renderRow(data) {
    let { screenWidth, screenHeight, } = Dimensions.get('window');
    return (
      <View style={layoutStyles.listContainer} >
        <View style={layoutStyles.listImageWrapper}>
          <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} style={layoutStyles.listImage} resizeMode="cover" />
        </View>
        <View style={layoutStyles.listTextWrapper}>
          <Text style={layoutStyles.listText} numberOfLines={1}>Title: {data.title} </Text>
          <View style={layoutStyles.listItemIconWrapper}>
            <Icons name="ios-arrow-forward" size={24} style={layoutStyles.listItemIcon} />
          </View>
        </View>  
      </View>
    );
  }
  render() {
    console.log('customerS this.state', this.state);
    let loadingView = (<LoadingView/>);
    let loadedDataView = (
      <ListView
        style={[ styles.flexBox, {paddingLeft:6, paddingRight:6, } ]}
        contentContainerStyle={{ position:'relative', }}
        dataSource={this.state.customerData.customers}
        renderRow={this.renderRow} >
      </ListView>
    );
    let errorView = (
      <View style={styles.container}>
        <Text style={styles.welcome}>ERROR</Text>		
      </View>
    );
    if (this.state.fetchData.url === constants.pipelines.all.BASE_URL + constants.pipelines.customers.GET_INDEX) { 
      if (this.state.fetchData.error) {
        return errorView;
      } else {
        return loadedDataView; 
      }
    } else {
      return loadingView;
    }
    
  }
}

export default Customers;