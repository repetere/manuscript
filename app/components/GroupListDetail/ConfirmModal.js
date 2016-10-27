import React, { Component } from 'react';
import { StyleSheet, ScrollView, View,  } from 'react-native';
import * as Animatable from 'react-native-animatable';
import layoutStyles from '../Styles/layout';
import styles from '../Styles/shared';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../LayoutElements';
import ResponsiveForm from '../ResponsiveForm';
import {  request, } from '../../util/request';
import constants from '../../constants';
import moment from 'moment';
import capitalize from 'capitalize';
import pluralize from 'pluralize';
import Tense from 'tense';
const tense = new Tense();

class ConfirmModal extends Component {
  constructor(props){
    super(props);
    let engineData = (this.props.GroupListDetailStateData && this.props.GroupListDetailStateData.detailData && this.props.GroupListDetailStateData.detailData.detailData) ? this.props.GroupListDetailStateData.detailData.detailData : {};
    this.state = engineData;
    // console.log('EngineDetailEdit constructor', { props, });
  }
  componentWillReceiveProps(nextProps) {
    // console.log('EngineDetailEdit componentWillReceiveProps', { nextProps, });
    let engineData = (nextProps.GroupListDetailStateData && nextProps.GroupListDetailStateData.detailData && nextProps.GroupListDetailStateData.detailData.detailData) ? nextProps.GroupListDetailStateData.detailData.detailData : {};
    // if (nextProps.fetchData.json) {
    this.setState(engineData);
    // }
  }
  getFormLayoutData() {
    return [{
      layoutColumns: 1,
      formElements: [{
        type:'textblock',
        label:'description',
        name: '',
        value:(this.props.confirmModal && this.props.confirmModal.description) ? this.props.confirmModal.description : `Are you sure you want to delete this ${tense.singularize(this.props.GroupListDetailStateData.listData.selectedGroup)}?`,
      }, {
        type: 'divider',    
      }, ],
    }, {
      layoutColumns: 2,
      layoutStyle: { 
      },  
      formElements: [{
        type:'submit',
        label:'Yes',
        name:'submit_button',
        value: 'Yes',
        passProps: {
          backgroundColor: 'mediumaquamarine',
          style: {
            color: 'white',
            height: 20,
          },
        },
      }, {
        type:'button',
        label:'Cancel',
        name: 'cancel_button',
        onPress: this.props.closeExtensionModal,
        value: 'Cancel',
        // passProps: {
        //   raised:true,
        // }
      }, ],  
    }, ];
  }
  confirmAction(formdata) {
    // console.log('confirmAction formdata', { formdata });
    let constants = this.props.confirmModal.constants;
    request(
      // this.props.confirmModal.postUrl + formdata._id,
     constants[ pluralize(this.props.GroupListDetail.groupTitle.toLowerCase()) ].all.BASE_URL + constants[ pluralize(this.props.GroupListDetail.groupTitle.toLowerCase()) ][ this.props.GroupListDetailStateData.listData.selectedGroup.toLowerCase() ].POST_UPDATE + formdata._id,
      {
        method: this.props.confirmModal.postMethod, //'DEL',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Access-Token': this.props.user.jwt_token,
        },
        body: JSON.stringify(formdata),
      })
      .then(updatedStatus => {
        this.props.getGroupListDetailFunctions.removeListDetailFromCompose(formdata);
        this.props.closeExtensionModal();
        // console.log('post updated', { updatedStatus });
      })
      .catch(e => {
        this.props.handleErrorNotification({ message:'Could not '+this.props.confirmModal.postMethod.toLowerCase()+' Engine. '+e, }, e);
      });
  }
  render() {
    let formdata = this.state;
    // console.log('CONFIRM MODAL this.props', this.props);
    return (
      <View style={{ flex:1, alignSelf:'stretch', }}>
        <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={[ styles.scrollViewStandardContentContainer, { padding:10, paddingBottom:120, }]}>
          <H2>{(this.props.confirmModal && this.props.confirmModal.title) ? this.props.confirmModal.title : 'Please Confirm'}</H2>
          <HR />
          <ResponsiveForm 
            ref="ConfirmModalForm"
            onSubmit={this.confirmAction.bind(this)}
            formdata={formdata}
            formgroups={this.getFormLayoutData.call(this)}
            />
        </ScrollView>
      </View>
    );
  }
}

export default ConfirmModal;