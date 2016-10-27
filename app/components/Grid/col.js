import React, { Component, } from 'react';
import {
  StyleSheet,
  View,
}  from 'react-native';


export default class Col extends Component {
	render() {
		return (
			<View style={[styles.col, { flex: parseInt(this.props.span) }, this.props.style]}>{this.props.children}</View>
		)
	}
}

const styles = StyleSheet.create({
	col: {
	}
});