import React, { Component, } from 'react';
import { View, Text, } from 'react-native';

class EmptyDisplay extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[ {
        flex: 1, justifyContent: 'center', alignItems: 'center',
      }, this.props.containerStyle, ]}>
        <Text style={[ { color: 'darkgrey', }, this.props.textStyle, ]}>{(this.props.message)?this.props.message:'No Data'}</Text>
    </View>);
  }
}

export default EmptyDisplay;