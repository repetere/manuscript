import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ListView, Image, Dimensions, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import Icons from '../../../../app/components/Icons';
import Table from '../../../../app/components/Table';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, } from 'react-native-elements';
import constants from '../../constants';
import ItemDetail from './itemDetail';
import { request, } from '../../../../app/util/request';


class Items extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemDataError: false,
      itemDataLoaded: false,
      itemData: {
        itempages: 1,
        items: [ { title: 'title' }],
        itemscount: 1,
      },
    };
  }
  componentDidMount() { 
    this.getPipelineIndex(); 
  }
  getPipelineIndex() {
    request(constants.pipelines.all.BASE_URL+constants.pipelines.items.GET_INDEX, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.user.jwt_token,
      },
    })
    .then(responseData => {
      this.setState({
        itemDataError: false,
        itemDataLoaded: true,
        itemData: {
          itempages: responseData.itempages,
          items: responseData.items,
          itemscount: responseData.itemscount,
        },
      });
    })
    .catch(error => {
      this.setState({
        itemDataError: error,
        itemDataLoaded: true,
      });
    });
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log('Parsers componentWillRecieveProps nextProps', nextProps);
  // }

  render() {
    let loadingView = (<LoadingView/>);
    let loadedDataView = (
      <Table
        name="pasdata-items-table"
        pages={this.state.itemData.itempages}
        rows={this.state.itemData.items}
        totalcount={this.state.itemData.itemscount}
        detailPath="/stats/items/:id"
        loadExtensionRouteOptions={{
          transitionDirection:'right',
        }}
        previousExtPath="/stats/items"
        previousExtloadExtensionRouteOptions={{
          transitionDirection:'left',
        }}
        {...this.props}
        >
      </Table>
    );
    let errorView = (
      <View style={styles.container}>
        <Text style={styles.welcome}>ERROR</Text>		
      </View>
    );
    if (this.state.itemDataLoaded) { 
      if (this.state.itemDataError) {
        return errorView;
      } else {
        return loadedDataView; 
      }
    } else {
      return loadingView;
    }
  }
}

export default Items;