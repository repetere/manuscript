import React, { Component, } from 'react';
import Icon_Entypo from 'react-native-vector-icons/Entypo';
import Icon_EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon_Foundation from 'react-native-vector-icons/Foundation';
import Icon_Ionicons from 'react-native-vector-icons/Ionicons';
import Icon_MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon_Octicons from 'react-native-vector-icons/Octicons';
import Icon_Zocial from 'react-native-vector-icons/Zocial';

const Icons = {
  Entypo:Icon_Entypo,
  EvilIcons: Icon_EvilIcons,
  FontAwesome: Icon_FontAwesome,
  Foundation: Icon_Foundation,
  Ionicons: Icon_Ionicons,
  MaterialIcons: Icon_MaterialIcons,
  Octicons: Icon_Octicons,
  Zocial: Icon_Zocial,
};

class Icon extends Component {
  constructor(props){
    super(props);
  }
  render(){
    let IconComponent = Icons[this.props.icontype] || Icon_Ionicons;
    let passProps = Object.assign({}, this.props);
    delete passProps.icontype;
    // let iconColor = (this.props.selected) ? colorStyles.active : colorStyles.nav;
    return (
      <IconComponent {...passProps} />
    );
  }
}

export default Icon;