import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Platform, ListView, Image, Dimensions, } from 'react-native';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import Icons from '../Icons';
import HTMLText from '../HTMLText';
// import ActionBar from '../MenuBar/ActionBar';
import MenuBar, { ActionBar, } from '../MenuBar';
import Form from '../Form';
import { checkStatus, request, } from '../../util/request';
import LoadingView from '../LoadingIndicator/LoadingView';
import { Button, FormLabel, FormInput, } from 'react-native-elements';
import constants from '../../constants';
import moment from 'moment';
import capitalize from 'capitalize';
import pluralize from 'pluralize';

class EngineDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalExtensionRefs: this.props.modalExtensionRefs,
    };
    this.detailViewModalComponents = null;
    // console.log('EngineDetail',{props,},this.state )
  }
  componentDidMount() { 
    if (this.refs && !this.state.modalExtensionRefs) {
      this.setState({
        modalExtensionRefs: this.refs,
      });
    }
    //    console.log('componentWillMount this',{this})
    // this.detailViewModalComponents = (this.props.detailViewModals) ? this.props.detailViewModals(this.props.GroupListDetail.detail.actions, this.props, this) : null;
  }
  componentWillReceiveProps(nextProps) {
    // console.log({ nextProps, });
    // if (nextProps.fetchData.json) {
    //   this.setState({
    //   });
    // }
  }
  componentWillMount() {
    // console.log('componentWillMount this',{this})
    // this.detailViewModalComponents = (this.props.detailViewModals) ? this.props.detailViewModals(this.props.GroupListDetail.detail.actions, this.props, this) : null;

  }
  getMenuBar() {
    let menuBarProps = {
      title: '',
      leftItem: {
        textIcon: {
          icontype: 'Ionicons',
          name: 'ios-arrow-back-outline',
        },
        itemType: 'text',
        onPress: this.props.goBackToExtension,
        label: capitalize(pluralize(this.props.GroupListDetail.list.componentProps.title)),
      },
      rightItem: {
        actions: [{
          icon: {
            icontype: 'Ionicons',
            name: 'ios-trash-outline', //   name: 'ios-settings-outline',
          },
          itemType: 'icon',
          title: 'Delete Engine',
          description: 'delete pipeline engine',
          type: 'confirmmodal',
          params: {
            path: '',
            method:'',
          },
        }, {
          icon: {
            icontype: 'Ionicons',
            name: 'ios-create-outline',
          },
          itemType: 'icon',
          title: 'Create Engine',
          description: 'create new engines',
          type: 'modal',
          modalOptions: {
            component: LoadingView,
            ref:'create_engine_modal',
            style: {
              // margin: 30,
              
              // width:500,
            },
          },
        },],
      },
      modalExtensionRefs: this.state.modalExtensionRefs,
    };


    if (this.props.getGroupListDetailFunctions.useSingleViewHelpers()){
      return <MenuBar {...menuBarProps} />;
    } else {
      return null;
    }
  }

  render() {
    let detailViewModalComponents = (this.props.detailViewModals) ? this.props.detailViewModals.call(this, this.props.GroupListDetail.detail.actions, this.props) : null;
    let menuBarContentWrapperStyle = (this.props.getGroupListDetailFunctions.useSingleViewHelpers()) ? layoutStyles.menuBarContentBottomtWrapperOverrride : {};
    let menuBarContentItemStyle = (this.props.getGroupListDetailFunctions.useSingleViewHelpers()) ? {} : { paddingLeft: 20, };
    let menuBarItemWrapperStyle = (this.props.getGroupListDetailFunctions.useSingleViewHelpers()) ? {
      justifyContent: 'space-around',
    } :
    {
      justifyContent: 'flex-end',
    };
    // console.log('detailView',{detailViewModalComponents})
    let ActionBarComponent = (<ActionBar
      {...this.props.GroupListDetail.detail}
      menuBarContentWrapperStyle={menuBarContentWrapperStyle}
      menuBarItemWrapperStyle={menuBarItemWrapperStyle}
      menuBarContentItemStyle={menuBarContentItemStyle}
      modalExtensionRefs={this.state.modalExtensionRefs}
      // passProps={this.props}
      />);
    let topActionBar = (this.props.getGroupListDetailFunctions.useSingleViewHelpers()) ? null : ActionBarComponent;
    let bottomActionBar = (this.props.getGroupListDetailFunctions.useSingleViewHelpers()) ? ActionBarComponent : null;
    return (
      <View className="scrollContainerViewFix" style={[ styles.scrollViewStandardContainer,  { paddingBottom:60, flex:1, } ]}  >
        {topActionBar}
        {this.getMenuBar() }
        <View style={{ flex:1, alignSelf:'stretch', }}>
          <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={styles.scrollViewStandardContentContainer} className="engineScrollView">
            {this.props.children}
          </ScrollView>
        </View>
        {bottomActionBar}
        {detailViewModalComponents}  
      </View>
    );
  }
}

export default EngineDetail;