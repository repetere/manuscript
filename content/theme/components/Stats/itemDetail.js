import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Platform, ListView, Image, Dimensions, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import Icons from '../../../../app/components/Icons';
import HTMLText from '../../../../app/components/HTMLText';
import Form from '../../../../app/components/Form';
import { checkStatus, request, } from '../../../../app/util/request';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, FormLabel, FormInput, } from 'react-native-elements';
import constants from '../../constants';
import moment from 'moment';

class ItemDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
    console.log('ItemDetail',{props,})
  }
  componentDidMount() { 
  }
  componentWillReceiveProps(nextProps) {
    // console.log({ nextProps, });
    // if (nextProps.fetchData.json) {
    //   this.setState({
    //   });
    // }
  }
  updateItem(formdata) {
    console.log('updateItem', { formdata });
    request(constants.pipelines.all.BASE_URL + constants.pipelines.items.POST_UPDATE + this.props.detailData._id,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Access-Token': this.props.user.jwt_token,
        },
        body: JSON.stringify(Object.assign(formdata,{ docid:this.props.detailData._id, })),
      })
      .then((response) => {
        console.log('updateItem request',{ response, });
      })
      .catch((error) => {
        console.warn('updateItem error',{ error, });
      });
  }
  render() {
    let HTMLTEXT = (this.props && this.props.detailData && this.props.detailData.content) ? this.props.detailData.content:'';
    let HTMLIMG = (this.props && this.props.detailData && this.props.detailData.primaryasset) ? `<img src=${this.props.detailData.primaryasset.fileurl}>` : '';
    let { width, height, } = Dimensions.get('window');
    let form = (this.props.detailData && this.props.detailData.title) ? (<Form error={false}
      submitFunction={this.updateItem.bind(this) }
      formElements={[
        <FormLabel>Title</FormLabel>,
        <FormInput name="title" placeholder="Please enter your username or email" defaultValue={this.props.detailData.title} selectTextOnFocus={true} autoCapitalize="none" formTextChange={true} returnKeyType="next" />,
        <Button title="Update" submitOnPress="true" />,
      ]}/>) : (<View/>);
    return (
      <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={styles.scrollViewStandardContentContainer}>
        <Button  title="GO BACK!!!" onPress={
          ()=>{
            this.props.onChangeExtension(this.props.previousExtPath, {
              config: this.props.previousExtloadExtensionRouteOptions,
              // passProps: this.props.tableData,
            });
          }}/> 
        
         {form}

        <HTMLText html={HTMLIMG} ></HTMLText>  
        <HTMLText html={HTMLTEXT}></HTMLText>  
        <Text>{JSON.stringify(this.props.detailData,'',2)}</Text>
        <Text>height ReactPropTypes.number height sets the height of this component.</Text>
      </ScrollView>
    );
  }
}

export default ItemDetail;