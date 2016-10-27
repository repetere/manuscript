import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, } from 'react-native';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import Icons from '../Icons';
import HTMLText from '../HTMLText';
import { Grid, Col } from '../Grid';
// import ActionBar from '../MenuBar/ActionBar';

// import { checkStatus, request, } from '../../util/request';
// import LoadingView from '../LoadingIndicator/LoadingView';
// import constants from '../../constants';
// import moment from 'moment';
// import capitalize from 'capitalize';
// import pluralize from 'pluralize';

exports.HR = class HR extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View {...this.props} style={[ layoutStyles.hr, this.props.style, ]}>{this.props.children}</View>;
  }
};

exports.H1 = class H1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={{flex:-1, 
}}><Text {...this.props} style={[ layoutStyles.detail_h1, this.props.style, ]}>{this.props.children}</Text></View>;
  }
};

exports.H2 = class H2 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={{flex:-1,  
}}><Text {...this.props} style={[ layoutStyles.detail_h2, this.props.style, ]}>{this.props.children}</Text></View>;
  }
};

exports.RESPONSIVE_TWO_COLUMN = class TWO_COLUMN extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { width, } = Dimensions.get('window');
    if (width > 600) {
      return this.getTwoColumns();
    } else {
      return this.getOneColumn();
    }
  }
  getOneColumn() {
    return (<View style={[this.props.style, ]}>
      {this.props.children[0]}
      {this.props.children[1]}
    </View>);
  }
  getTwoColumns() {
    return (<View style={[{ flex:1, flexDirection:'row', }, this.props.style, ]}>
      <View style={{ flex:2, }}>
        {this.props.children[0]}
      </View>
      <View style={{ flex:2, }}>
        {this.props.children[1]}
      </View>
    </View>);
  }
};

let defaultColumnMargins = function (width) {
  return {
    twoColumnMargins: (width > 600) ? {
      left: {
        marginRight: 20,
      },
      right: {
        marginLeft: 20,
      },
    } : { },
  };
};

exports.getGridMarginStyle = function (options) {
  let { width, formgroup, i, columnMargins, } = options;
  let twoColumnMargins = (columnMargins && columnMargins.twoColumnMargins) ? columnMargins.twoColumnMargins : defaultColumnMargins(width).twoColumnMargins;
  return (formgroup.layoutColumns === 2)
    ?
    (i % 2 === 0) ? twoColumnMargins.left : twoColumnMargins.right
    : {};
};

exports.GRID_ITEM = class GRID_ITEM extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let reverseItems = (this.props.useLabel) ? { flexDirection:'column-reverse', } : {} ;
    return (<View style={[layoutStyles.gridItemContainer, this.props.style]}>  
      {(this.props.icon) ? (
        <View style={layoutStyles.gridItemIconWrapper}><Icons {...this.props.icon} size={24}/></View>)
        : null}  
        <View style={[ layoutStyles.gridItemContent, this.props.gridItemContentStyle, reverseItems, ]}>
          {(this.props.title)?(<Text numberOfLines={1} style={layoutStyles.gridItemTitle}>{this.props.title}</Text>):null}
          {(this.props.description)?(<Text numberOfLines={1} style={layoutStyles.gridItemDescription}>{this.props.description}</Text>):null}
          {(this.props.children) ? this.props.children: null}
        </View> 
    </View>);  
  }
};

exports.RESPONSIVE_GRID = class RESPONSIVE_GRID extends Component {
  constructor(props) {
    super(props);
  }
  render() { 
    let { width, } = Dimensions.get('window');
    let gridColumns = 1;
    if (width < 600 && this.props.narrowColumns) {
      gridColumns = this.props.narrowColumns;
    } else if (width >= 600 && this.props.columns) {
      gridColumns = this.props.columns;
    }
    let colSpan = (24 / gridColumns);
    let gridItems = (Array.isArray(this.props.children) && this.props.children.length > 1 ) ?
      this.props.children.map((child, i) => {
        return (
          <Col key={i} span={colSpan}>
            {child}
          </Col>);
      }) :
      ([(<Col key={0} span={colSpan}>{this.props.children}</Col>)]);
    
    // console.log('this.props.children',this.props.children)
    // console.log({gridItems})
    return (
      <Grid style={[ { alignSelf: 'stretch', alignItems: 'stretch', }, this.props.style, ]}>
        {gridItems}
      </Grid>);
  }
};