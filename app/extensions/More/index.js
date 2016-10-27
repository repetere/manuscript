/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//TO DO: https://github.com/clh161/react-native-easy-grid-view
import React, { Component, } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Image, Platform, TouchableHighlight, TouchableOpacity, AsyncStorage, } from 'react-native';
import { Button, PricingCard, } from 'react-native-elements';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import SortableListView from 'react-native-sortable-listview';
import styles from '../../components/Styles/shared';
import layoutStyles from '../../components/Styles/layout';
import Icons from '../../components/Icons';
import constants from '../../constants';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, getGridMarginStyle, } from '../../components/LayoutElements';
import capitalize from 'capitalize';

const moreRowStyle = StyleSheet.create({
  touchWrapper: {
    padding: 15, backgroundColor: 'white', borderBottomWidth: StyleSheet.hairlineWidth || 1, borderColor: 'lightgrey',
  },
  rowContainer: {
    flexDirection: 'row', flex: 1, alignItems:'center', 
  },
  tabIconContainer: { height: 60, width: 50, marginRight: 10, justifyContent: 'center', },
  textContainer: { justifyContent: 'center', flex: 1, },
  reorderContainer: { height: 60, width: 70, marginLeft: 10, justifyContent: 'center', alignItems:'flex-end' },
});


class RowComponent extends Component{
  render() {
    // console.log(this.props.tabsOrder.indexOf(this.props.rowID))
    let tabIcon = (<View style={moreRowStyle.tabIconContainer}>
      <Icons name={this.props.data.icon.initial} size={40} style={[]} />
    </View>);
    let tabText = (<Text style={moreRowStyle.textContainer}>{capitalize(this.props.data.title || this.props.data.name)}</Text>);
    let tabReorder = (Platform.OS === 'web') ? (
      <View style={{ flexDirection:'row', }}>
        <TouchableOpacity style={{ marginRight:10, }} onPress={() => {
          this.props.moveTabUp(this.props.tabsOrder.indexOf(this.props.rowID));
        } }>
          <Icons name="ios-arrow-dropup-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.props.moveTabDown(this.props.tabsOrder.indexOf(this.props.rowID));
        } }>
          <Icons name="ios-arrow-dropdown-outline" size={30} />
        </TouchableOpacity>  
    </View>) : (<Icons name="ios-reorder-outline" size={30} />);
    // console.log('RowComponent this.props', this.props);
    return (Platform.OS === 'web') ? (<View style={moreRowStyle.touchWrapper}>
      <View style={moreRowStyle.rowContainer}>
        {tabIcon}  
        {tabText}  
        <View style={moreRowStyle.reorderContainer}>
          {tabReorder}
        </View>
      </View>
    </View>) : (
    <TouchableHighlight
      underlayColor={'#eee'}
      style={moreRowStyle.touchWrapper} {...this.props.sortHandlers}>
        <View style={moreRowStyle.rowContainer}>
          {tabIcon}  
          {tabText}  
          <View style={moreRowStyle.reorderContainer}>
            {tabReorder}
          </View>
        </View>
    </TouchableHighlight>);
  }
}

class More extends Component {
  constructor(props){
    super(props);
    let data = {};
    let order = [];
    this.props.tabBarExtensions.all.forEach(tab => {
      data[ tab.name ] = tab;
      order.push(tab.name);
    });
    this.state = {
      data,
      order,
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log('MORE componentWillReceiveProps ', { nextProps });
    let data = {};
    let order = [];
    nextProps.tabBarExtensions.all.forEach(tab => {
      data[ tab.name ] = tab;
      order.push(tab.name);
    });
    this.setState({
      data,
      order,
    });
  }
  moveTabDown(tabIndex) {
    if (tabIndex + 1 !== this.state.order.length) {
      this.state.order.splice(tabIndex+1, 0, this.state.order.splice(tabIndex, 1)[ 0 ]);
      let newArrayOfTabExtensions = this.state.order.map(o => this.state.data[ o ]);
      // console.log('new order', { order, newArrayOfTabExtensions, });
      this.props.setTabExtensions(newArrayOfTabExtensions);
      this.forceUpdate();
    }
  }
  moveTabUp(tabIndex) {
    if (tabIndex > 0) {
      this.state.order.splice(tabIndex-1, 0, this.state.order.splice(tabIndex, 1)[ 0 ]);
      let newArrayOfTabExtensions = this.state.order.map(o => this.state.data[ o ]);
      // console.log('new order', { order, newArrayOfTabExtensions, });
      this.props.setTabExtensions(newArrayOfTabExtensions);
      this.forceUpdate();
    }
  }
  render() {
    // console.log('MORE RENDER this.state', this.state);
    return (
      <View style={[ styles.stretchBox, styles.statusBarPadding, styles.tabBarPadding, ]}>
        <H1 style={{
          borderBottomWidth: 0, padding: 10,
          paddingBottom: 10,
          marginBottom: 0, borderBottomColor: 'transparent',
        }}>More Tabs</H1>  
        <SortableListView
          style={{ flex: 1, alignSelf:'stretch', borderTopWidth: StyleSheet.hairlineWidth || 1, borderTopColor:'lightgrey', }}
          contentContainerStyle={(Platform.OS==='web')?layoutStyles.positionRelative:undefined}
          data={this.state.data}
          order={this.state.order}
          onRowMoved={e => {
            this.state.order.splice(e.to, 0, this.state.order.splice(e.from, 1)[ 0 ]);
            let newArrayOfTabExtensions = this.state.order.map(o => this.state.data[ o ]);
            // console.log('new order', { order, newArrayOfTabExtensions, });
            this.props.setTabExtensions(newArrayOfTabExtensions);
            // this.forceUpdate();
          }}
          renderRow={(row, sectionID, rowID)  => <RowComponent sectionID={sectionID} rowID={rowID} data={row} moveTabDown={this.moveTabDown.bind(this)} moveTabUp={this.moveTabUp.bind(this)} tabsOrder={this.state.order} />}
        />
      </View>
    );
  }
}
export default More;
