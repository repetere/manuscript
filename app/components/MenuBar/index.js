import React, { Component, } from 'react';
import { View, Text, TouchableOpacity,} from 'react-native';
import capitalize from 'capitalize';
import pluralize from 'pluralize';
import Icons from '../Icons';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import colorStyles from '../Styles/colors';

function getMenuItem(props, propertyName) {
  let itemProps = props[ propertyName ];
  if (itemProps) {
    if (itemProps.actions) {
      return itemProps.actions.map((action, i) => getMenuItemList(action, i, props.menuBarContentItemStyle, props.modalExtensionRefs));
    } else if (itemProps.itemType === 'icon') {
      return <Icons {...itemProps.icon} style={[ layoutStyles.menuBarItemIcon, colorStyles.link, ]} size={24}/>;
    } else if (itemProps.itemType === 'text'){
      return (<TouchableOpacity onPress={itemProps.onPress}>
        <View style={{flexDirection:'row'}}>
          {(itemProps.textIcon) ? (<Icons {...itemProps.textIcon} style={[ layoutStyles.menuBarItemIcon, colorStyles.link, {paddingRight:2} ]} size={24}/>):null}
          <Text style={[
            layoutStyles.menuBarItemIcon,
            layoutStyles.menuBarItemText,
            colorStyles.link,
          ]}>{ props[ propertyName ].label }
          </Text>
        </View>
      </TouchableOpacity>);
    }
  } else {
    return <View style={[layoutStyles.menuBarItemIcon, { minWidth:40, }, ]}/>;
  }
}

function getMenuTitle(props) {
  let title = (props.title) ?
    (<Text style={layoutStyles.menuBarTitle}>
    { pluralize(capitalize(props.title)) }
    </Text>) : (<Text style={layoutStyles.menuBarTitle}>
    { ' ' }
    </Text>) ;
  
  return title;
}

function getMenuItemList(props, index, menuBarContentItemStyle = {}, modalExtensionRefs = {}) {
  let onPressProp = {};
  if (props) {
    if (props.type === 'modal') {
      // console.log('getMenuItem ', {props, modalExtensionRefs})
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
    } else if (props.itemType === 'text') {
      if (props.onPress) {
        return <TouchableOpacity key={index} onPress={props.onPress} style={{justifyContent:'center', flex:1,}}><Text style={[layoutStyles.menuBarItemIcon, layoutStyles.menuBarItemText, menuBarContentItemStyle, ]}>{props.label}</Text></TouchableOpacity>; 
      } else {
        return <Text key={index} style={[layoutStyles.menuBarItemIcon, layoutStyles.menuBarItemText, menuBarContentItemStyle, ]}>{props.label}</Text>;  
      }
    }
  }
  else {
    return <View key={index} style={[layoutStyles.menuBarItemIcon, { minWidth:40, }, menuBarContentItemStyle, ]}/>;
  }
}

export class ActionBar extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    let menuItems = this.props.actions.map((action, i) => getMenuItemList(action, i, this.props.menuBarContentItemStyle,this.props.modalExtensionRefs));

    return (<View style={[layoutStyles.menuBarContentWrapper, this.props.menuBarContentWrapperStyle, ]}>
      <View style={[layoutStyles.menuBarItemWrapper, this.props.menuBarItemWrapperStyle, ]}>
        {menuItems}
      </View>
    </View>);
  }
}


class MenuBar extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    let rightMenuItem = getMenuItem(this.props, 'rightItem');
    let leftMenuItem = getMenuItem(this.props, 'leftItem');

    return (<View style={layoutStyles.menuBarContentWrapper}>
      <View style={layoutStyles.menuBarItemWrapper}>
        {leftMenuItem} 
        {getMenuTitle(this.props)}
        {rightMenuItem}
      </View>
    </View>);
  }
}

export default MenuBar;