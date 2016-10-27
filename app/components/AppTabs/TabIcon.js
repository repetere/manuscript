import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
  //  SocialIcon, List, ListItem, ListView, PricingCard
} from 'react-native-elements';
import styles from '../Styles/shared';
import colorStyles from '../Styles/colors';
import Icon from '../Icons';
// import Icon from 'react-native-vector-icons/Ionicons';
import capitalize from 'capitalize';

class TabIcon extends Component{ 
  constructor(props) {
    super(props);
    // this.state = {page:'second'};
  }
  render() {
    let selected = this.props.path === this.props.location_path;
    let iconName = (selected) ? this.props.icon.initial : this.props.icon.initial;
    let iconColor = (selected) ? colorStyles.active : colorStyles.nav;
    return (
      <TouchableOpacity 
        onPress={()=>{
          this.props.onSelect({ props:this.props, });
        }}>
        <View style={styles.centerBox}>
          <Icon name={iconName} size={30} color={iconColor.color} style={iconColor} icontype={this.props.icon.type || 'Ionicons'}/>
          <Text style={[
            iconColor, styles.tabBarText,
          ]}>{capitalize(this.props. title || this.props.name) }</Text>
        </View>
      </TouchableOpacity>
    );
  }
}


export default TabIcon;