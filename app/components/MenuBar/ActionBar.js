import React, { Component, } from 'react';
import { View, Text, } from 'react-native';
import capitalize from 'capitalize';
import pluralize from 'pluralize';
import Icons from '../Icons';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import colorStyles from '../Styles/colors';

function getMenuItem(props, index, menuBarContentItemStyle = {}, modalExtensionRefs = {}) {
  console.log({ modalExtensionRefs });
  let onPressProp = {};
  if (props) {
    if (props.type === 'modal') {
      // console.log('getMenuItem ',{props, modalExtensionRefs})
      onPressProp = {
        onPress: () => { modalExtensionRefs[ props.modalOptions.ref ].open(); }
      };
    }
    if (props.itemType === 'icon') {
      return <Icons {...props.icon}
        style={[ layoutStyles.menuBarItemIcon, colorStyles.link, menuBarContentItemStyle, ]}
        {...onPressProp}
        // onPress={() => { console.log('icon pressed', { modalExtensionRefs, props }) } }
        size={24}
        key={index}/>;
    } else if (props.itemType === 'text'){
      return <Text key={index} style={[layoutStyles.menuBarItemIcon, layoutStyles.menuBarItemText, menuBarContentItemStyle, ]}>{props.label}</Text>;  
    }
  }
  else {
    return <View key={index} style={[layoutStyles.menuBarItemIcon, { minWidth:40, }, menuBarContentItemStyle, ]}/>;
  }
}

class ActionBar extends Component{
  constructor(props) {
    super(props);
    console.log('constructor ActionBar this.props',this.props)
  }
  render() {
    console.log('ActionBar this.props',this.props)
    let menuItems = this.props.actions.map((action, i) => getMenuItem(action, i, this.props.menuBarContentItemStyle,this.props.modalExtensionRefs));

    return (<View style={[layoutStyles.menuBarContentWrapper, this.props.menuBarContentWrapperStyle, ]}>
      <View style={[layoutStyles.menuBarItemWrapper, this.props.menuBarItemWrapperStyle, ]}>
        {menuItems}
      </View>
    </View>);
  }
}

export default ActionBar;