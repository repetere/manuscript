/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { cloneElement, Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
// import {} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Form extends Component{
  constructor() {
    super(...arguments);
    this.state = {
    };
    // console.log('this.props', this.props);
  }
  onSubmit() {
    console.log('submitting form props', this.props);
    console.log('form this.state', this.state);
    this.props.submitFunction(this.state);
    // this.refs.view.bounce(800);
  }
  onChangeText(name, text) {
    // console.log('name, text', name, text);
    this.setState((previousState, currentProps) => {
      let newState = previousState;
      newState[ name ] = text;
      return newState;
    });    
  }
  onValueChange(name, value) {
    console.log('name, value', name, value);
    this.setState((previousState, currentProps) => {
      let newState = previousState;
      newState[ name ] = value;
      return newState;
    });    
  }
  render() {
    let FormData = this.props.formElements.map((formElement, i) => {
      // console.log('formElement', formElement);
      let formDataProps = { key: i, };
      if (formElement.props.submitOnPress) {
        formDataProps.onPress = this.onSubmit.bind(this);
      }
      if (formElement.props.formTextChange) {
        formDataProps.onChangeText = this.onChangeText.bind(this, formElement.props.name);
      }
      if (formElement.props.formSwitchChange) {
        formDataProps.onValueChange = this.onValueChange.bind(this, formElement.props.name);
        formDataProps.value = this.state[ formElement.props.name ];
      }
      let bindedElement = cloneElement(formElement, formDataProps);
      return (bindedElement);
    });
    // console.log('this.state', this.state );
    return (
      <Animatable.View ref="view" style={[{
        flex: 1,
        alignSelf: 'stretch',
      }, this.props.formStyle,
      ]}>
        {/*<Text>Form</Text>*/}
        {FormData}
      </Animatable.View>
    );
  }
  componentDidUpdate() {
    console.log('componentDidUpdate this.props.error', this.props.error);
    if (this.props.error) {
      switch (this.props.errorNotification) {
        case 'bounce':
          return this.refs.view.bounce(800);
        default:
          return this.refs.view.tada(800);
      }
    }

  }
}
export default Form;
