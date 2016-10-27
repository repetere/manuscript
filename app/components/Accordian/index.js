import React, { Component, } from 'react';
import { View, Text, StyleSheet, Animated, TouchableHighlight, } from 'react-native';
import capitalize from 'capitalize';
import pluralize from 'pluralize';
import Icons from '../Icons';
import sharedStyles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import colorStyles from '../Styles/colors';
'use strict';

// import Icon from 'react-native-vector-icons/FontAwesome';
// https://github.com/caroaguilar/react-native-bar-collapsible

let styles = StyleSheet.create({
  bar: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 45,
  },

  barWrapper: {
    alignSelf: 'stretch',
  },

  icon: {
    padding: 5,
    width: 40
  },

  title: {
    flex: 1,
    fontSize: 15,
  },
});

class BarCollapsible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      icon: 'arrow-right',
      onPressed: null,
      title: '',
      children: null,
      show: false
    };
  }

  componentDidMount() {
    if (this.props.clickable) {
      this.setState({
        icon: this.props.icon,
        onPressed: this.props.onPressed,
        title: this.props.title
      });
    } else if (this.props.collapsible) {
      Animated.timing(
        this.state.fadeAnim,
        { toValue: 1 }
      ).start();

      this.setState({
        icon: this.props.iconActive || 'plus',
        iconCollapsed: this.props.iconCollapsed || 'plus',
        iconOpened: this.props.iconOpened || 'minus',
        title: this.props.title
      });
    } else {
      this.setState({
        title: this.props.title
      });
    }

    this._tintColor = this.props.tintColor || 'black';
    this._iconSize = this.props.iconSize || 24;
    this._backgroundColor = { backgroundColor: this.props.backgroundColor };
  }

  render() {

    if (this.props.clickable) {
      return this._renderClickable();
    } else if (this.props.collapsible) {
      return this._renderCollapsible();
    } else {
      return this._renderDefault();
    }
  }

  _renderDefault() {
    return (
      <View style={styles.bar}>
        <Text style={styles.title}>{this.state.title}</Text>
      </View>
    );
  }

  _renderClickable() {
    let icontype = this.props.icontype || 'FontAwesome';
    return (
      <TouchableHighlight style={styles.barWrapper} underlayColor='transparent' onPress={this.state.onPressed}>
        <View style={[ styles.bar, this._backgroundColor ]}>
          <Text style={styles.title}>{this.state.title}</Text>
          <Icons icontype={icontype} name={this.state.icon} size={this._iconSize} color={this._tintColor} style={styles.icon} />
        </View>
      </TouchableHighlight>
    );
  }

  _renderCollapsible() {
    let icontype = this.props.icontype || 'FontAwesome';
    return (
      <View style={this.props.containerStyle}>
        <TouchableHighlight style={styles.barWrapper} underlayColor='transparent' onPress={() => { this._toggleView() } }>
        
          <View style={[ styles.bar, this._backgroundColor ]}>
            {(this.props.useLeftIcon)? (<Icons icontype={icontype} name={this.state.icon} size={this._iconSize} color={this._tintColor} style={styles.icon} />):null}
            <Text style={styles.title}>{this.state.title}</Text>
            {(!this.props.useLeftIcon)? (<Icons icontype={icontype} name={this.state.icon} size={this._iconSize} color={this._tintColor} style={styles.icon} />):null}
          </View>
        </TouchableHighlight>
        {this.state.show && <Animated.View
          style={{ opacity: this.state.fadeAnim }}>
          {this.props.children}
        </Animated.View>}
      </View>
    );
  }

  _toggleView() {
    this.setState({
      show: !this.state.show,
      icon: this.state.show ? this.state.iconCollapsed : this.state.iconOpened
    });
  }
}
export default BarCollapsible;