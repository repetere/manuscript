import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ListView, Image, Dimensions, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import Icons from '../../../../app/components/Icons';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, } from 'react-native-elements';
import constants from '../../constants';
import moment from 'moment';
import numeral from 'numeral';
import Table from '../../../../app/components/Table';
import { request, } from '../../../../app/util/request';


function getBlankHeader() {
  return {
    identification: {},
    contact: {},
    credit_bureau: {},
    self_reported: {},
  };
}
function getRenderRowData(data) {
  return {
    columns: [{
      style: {
        width:200,
      },
      heading: 'GUID',
      label: data.identification.guid,
    }, {
      style: {
        width: 200,
      },
      heading: 'Date',
      label: moment(data.identification.application_submission_date).format('MM/DD/YYY | hh:mm:ssa'),
    }, {
      style: {
        width: 300,
      },
      heading: 'Email',
      label: data.contact.email,
    }, {
      style: {
        width: 90,
      },
      heading: 'Income',
      label: numeral(data.self_reported.annual_income).format('$0,0[.]00') || 'null',
    }, {
      style: {
        width: 45,
      },
      heading: 'FICO',
      label: data.credit_bureau.fico_score || 'null',
    }],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
    image: {
      uri: 'https://facebook.github.io/react/img/logo_og.png',
    },
  };
}

class Applications extends Component {
  constructor(props){
    super(props);
    this.state = {
      applicationDataError: false,
      applicationDataLoaded: false,
      applicationData: {
        applicationpages: 1,
        applications: [ { title: 'title', }],
        applicationscount: 1,
      },
    };
  }
  componentDidMount() { 
    this.getPipelineIndex(); 
  }
  // componentWillMount() {
  //   console.log('componentWillMount APPPLICATIONS mounted')
  // }
  // componentWillUpdate() {
  //   console.log('componentWillUpdate APPPLICATIONS mounted')
  // }
  getPipelineIndex() {
    request(constants.pipelines.all.BASE_URL+constants.pipelines.applications.GET_INDEX, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.user.jwt_token,
      },
    })
    .then(responseData => {
      this.setState({
        applicationDataError: false,
        applicationDataLoaded: true,
        applicationData: {
          applicationpages: responseData.applicationpages,
          applications: responseData.applications,
          applicationscount: responseData.applicationscount,
        },
      });
    })
    .catch(error => {
      this.setState({
        applicationDataError: error,
        applicationDataLoaded: true,
      });
    });
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps APPPLICATIONS mounted')
  //     this.getPipelineIndex(); 
  // }
  render() {
    let loadingView = (<LoadingView/>);
    let loadedDataView = (
      <Table
        name="pasdata-applications-table"
        pages={this.state.applicationData.applicationpages}
        rows={this.state.applicationData.applications}
        totalcount={this.state.applicationData.applicationscount}
        getBlankHeader={getBlankHeader}
        getRenderRowData={getRenderRowData}
        {...this.props}
        >
      </Table>
    );
    let errorView = (
      <View style={styles.container}>
        <Text style={styles.welcome}>ERROR</Text>		
      </View>
    );
    if (this.state.applicationDataLoaded) { 
      if (this.state.applicationDataError) {
        return errorView;
      } else {
        return loadedDataView; 
      }
    } else {
      return loadingView;
    }
  }
}

export default Applications;