import React, { Component, cloneElement } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, ListView, Image, Dimensions, TouchableOpacity, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button, } from 'react-native-elements';
import moment from 'moment';
import numeral from 'numeral';
import Icons from '../Icons';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import colorStyles from '../Styles/colors';

function getBlankDefaultHeader() {
  return {
    title: 'n/a',
    createdat: new Date(),
    primaryasset: {
      fileurl:'https://facebook.github.io/react/img/logo_og.png',
    },
  };
}

function getDataSource() {
  return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
}

function getDefaultRenderRowData(data) {
  let rowData = Object.assign({}, getBlankDefaultHeader(), data);
  return {
    columns: [{
      style: {
        width:200,
      },
      heading: 'Title',
      label: rowData.title,
    }, {
      style: {
        width: 200,
      },
      heading: 'Date',
      label: moment(rowData.createdat).format('MM/DD/YYYY | hh:mm:ssa'),
    }],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
    image: {
      uri: rowData.primaryasset.fileurl,
    },
  };
}

function getAnimationState(state) {
  switch(state){
  case 'showTable':
    return {
      tableAnimation: {
        // animation: 'slideInLeft',
        duration:500,
        delay:100,
      },
      detailAnimation: {
        // animation: 'slideOutRight',
        duration:500,
        delay: 100,
      },
    };
  case 'showDetail':
    return {
      tableAnimation: {
        // animation: 'slideOutLeft',
        duration:500,
        delay: 100,
      },
      detailAnimation: {
        // animation: 'slideInRight',
        duration:500,
        delay: 100,
      },
    };
  default:
    return {
      tableAnimation: {
      },
      tableAnimationDelay: {
      },
      detailAnimation: {
      },
      detailAnimationDelay: {
      },
    };
  }
}

class Table extends Component {
  constructor(props){
    super(props);
    let ds = getDataSource();
    // console.log('Table', { props });
    this.getBlankHeader = props.getBlankHeader || getBlankDefaultHeader;
    this.getRenderRowData = props.getRenderRowData || getDefaultRenderRowData;
    this.state = {
      pages: this.props.pages || 1,
      rows: (this.props.rows)? ds.cloneWithRows(this.props.rows) : ds.cloneWithRows([ this.getBlankHeader() ]),
      rowscount: (this.props.rows && this.props.rows.length>3) ? this.props.rows.length : 10,
      totalcount: this.props.totalcount || 1,
    };
  }
  componentWillReceiveProps(nextProps) {
    let ds = getDataSource();
    if (nextProps.rows) {
      this.setState({
        pages: nextProps.pages,
        rows: ds.cloneWithRows(nextProps.rows),
        rowscount: nextProps.rows.length,
        totalcount: nextProps.totalcount,
      });
    }
  }
  render() {
    // console.log('TABLE this',{this})
    return (
      <View style={[styles.scrollViewStandardContainer,{ flex:1, }, this.props.style]}  >
        <ListView
          style={[ styles.flexBox, { paddingLeft:6, paddingRight:6, } ]}
          contentContainerStyle={{ position:'relative', }}
          dataSource={this.state.rows}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this, this.getRenderRowData) }
          renderHeader={this.renderHeader.bind(this) }
          initialListSize={(Platform.OS==='web')?this.state.rowscount:20}
          >
        </ListView>
      </View>
    );
  }
  renderHeader() {
    let data = this.getBlankHeader();
    let renderData = this.getRenderRowData(data);

    let { /* height,*/ width, } = Dimensions.get('window');
    return (
      <View style={[ layoutStyles.listContainer, layoutStyles.tableHeaderContainer]} >
        {(this.props.noImage === true) ? null : (<View style={[layoutStyles.listImageWrapper,layoutStyles.tableHeaderImageContainer]}></View>)}
        
        <View style={[ layoutStyles.listTextWrapper, layoutStyles.tableHeaderTextWrapper]}>
          <View style={[layoutStyles.listTextContainer,{ maxWidth:(width-110), }]}>
            {renderData.columns.map((column, i) => {
              return (
                <Text key={i} style={[ layoutStyles.listText, column.style, layoutStyles.tableHeaderText, ]} numberOfLines={this.props.numberOfLines || this.props.numberOfHeaderLines }>{column.heading.toUpperCase()} </Text>
              );
            }) }
          </View>  
          {(this.props.noAction === true) ? null : (
            <View style={[ layoutStyles.listItemIconWrapper, { height: 10 }]}></View>)}
        </View>  
      </View>
    );
  }
  renderRow(tranformFunction, data, sectionId, rowId) {
    // console.log('TABLE renderRow',{tranformFunction}, {data})
    let renderData = tranformFunction(data);
    let { /*height,*/ width, } = Dimensions.get('window');
    // console.log('width-100', width-100 ,{width});
    let actionsComponent = null;
    if (this.props.noAction !== true) {
      actionsComponent = (
        <TouchableOpacity style={layoutStyles.listItemIconWrapper} onPress={this.loadDetail.bind(this, data, renderData, sectionId, rowId)}>
          <Icons name={renderData.action.icon.name} size={22} style={layoutStyles.listItemIcon} />
        </TouchableOpacity>);
    }
    if (this.props.rowActions && this.props.rowActions.length > 0) {
      actionsComponent = (
        <View  style={[layoutStyles.listItemIconWrapper,{marginRight:20,}]}>
          {this.props.rowActions.map((action, i) => {
            return (
              <TouchableOpacity key={i} style={{
                paddingLeft: 10,
                paddingRight: 10, 
                right:15,
                // top: 10,
                height:25,
              }} onPress={action.onPress.bind(this, data, renderData, sectionId, rowId)}>
                <Icons name={action.icon.name} size={22} style={[layoutStyles.listItemIcon,action.icon.style]} />
              </TouchableOpacity>
            );
          })
          }
        </View>);
    }

    return (
      <View style={[layoutStyles.listContainer, { backgroundColor:(parseInt(rowId)%2!==0)?'ghostwhite':undefined, }]} >
        {(this.props.noImage===true)?null:(<View style={layoutStyles.listImageWrapper}>
          <Image source={{ uri: renderData.image.uri, }} style={layoutStyles.listImage} resizeMode="cover" />
        </View>)}
        
        <View style={layoutStyles.listTextWrapper}>
          <View style={[layoutStyles.listTextContainer, { maxWidth:(width-110), }]}>
            {renderData.columns.map((column, i) => {
              if (Platform.OS === 'web' && column.usePRE) {
                return (<View key={i} style={[ layoutStyles.listText, column.style, ]}><pre style={{ overflow:'auto', }}>{(column.useJSON)?JSON.stringify(column.label, null, 2):column.label}</pre></View>);
                // return (<View key={i} style={[ layoutStyles.listText, column.style, ]}><pre style={{ overflow:'auto', }}>{column.label}</pre></View>);
              }
              return (
                <Text key={i} style={[layoutStyles.listText, column.style, ]} numberOfLines={this.props.numberOfLines}>{(column.useJSON)?JSON.stringify(column.label, null, 2):column.label}</Text>
                // <Text key={i} style={[layoutStyles.listText, column.style, ]} numberOfLines={this.props.numberOfLines}>{column.label}</Text>
              );
            }) }
          </View>
          {actionsComponent}
        </View>  
      </View>
    );
  }
  loadDetail(detailData, detailRowData, sectionId, rowId) {
    // console.log({ detailData }, { detailRowData }, this.props);
    this.props.onChangeExtension(this.props.detailPath.replace(':id', detailData._id), {
      config: this.props.loadExtensionRouteOptions,
      passProps: {
        detailData,
        detailRowData,
        // tableData: {
        //   name:this.props.name,
        //   pages: this.state.pages,
        //   rows: this.props.rows,
        //   rowscount: this.state.rowscount,
        //   totalcount: this.state.totalcount,
        // },
        previousExtPath: this.props.previousExtPath, previousExtloadExtensionRouteOptions: this.props.previousExtloadExtensionRouteOptions,
      },
    });
    // let detailViewComponent = cloneElement(this.props.detailView, Object.assign({}, this.props, { detailData, renderData, }));
    // this.setState(Object.assign({}, getAnimationState('showDetail'), { detailData, detailRowData, }));
    // this.refs.table.slideOutLeft(800);//.then((endState) => console.log(endState.finished ? 'slideOutLeft finished' : 'slideOutLeft cancelled'));
    // detailViewComponent.slideInRight(800);
  }
}
export default Table;
