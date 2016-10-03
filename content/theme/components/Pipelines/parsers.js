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


class Parsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: props.fetchData,
    };
    console.log('CUSTOM Parsers this.props', this.props);
  }
  componentDidMount() {
    // let requestHeaders = new Headers();
    // requestHeaders.set('Accept', 'application/json');
    // requestHeaders.set('Content-Type', 'application/json');
    // requestHeaders.set('X-Access-Token',  this.props.user.jwt_token);
    // requestHeaders.set('x-access-token',  this.props.user.jwt_token);

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
    console.log('Parsers componentWillRecieveProps nextProps', nextProps);
    this.setState({
      fetchData: nextProps.fetchData,
    });
  }
  render() {
    // let repoGrid = (this.state.fetchData.json && this.state.fetchData.json.length > 0) ?
    //   <List containerStyle={{ marginBottom: 20,padding:0 }}>{this.state.fetchData.json.map((l, i) => (
    //   <RepoItem {...l} key={l.id}
    //   />
    //   )) }</List> : <Text>No repos</Text>;
    
    // // let repoGrid = (this.state.fetchData.json && this.state.fetchData.json.length>0)?<GridView items={this.state.fetchData.json} itemsPerRow={3} renderItem={this.renderItem}  style={gridStyles.listView}/>:<Text>No repos</Text>;
    let homepage = (
      <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={styles.scrollViewStandardContentContainer}>
         <Text style={styles.welcome}>
            Custom Parsers Page
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
    let error = (
      <View style= {[styles.container]}>
        <Text>Error {this.state.fetchData.error}</Text>
      </View>
    );
    let loading = (
      <View style={[styles.container]}>
        <ActivityIndicator
          animating={this.state.animating}
          style={[{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
          }, {
            height: 80,
          }]}
          size="large"
        />
      </View>
    );
    if (this.state.fetchData.error) {
      return error;
    } else if (this.state.fetchData.json && (this.state.fetchData.json.applications && this.state.fetchData.json.customers && this.state.fetchData.json.files && this.state.fetchData.json.investors)) {
      return homepage;
    } else {
      return loading;
    }
  }
  // renderItem(item) {
  //   return <RepoItem {...item} key={item.id} />;
  // }
}

export default Parsers;