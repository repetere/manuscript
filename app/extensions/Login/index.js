/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { cloneElement, Component } from 'react';
import ReactNative, {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Platform,
  ListView,
  Switch,
} from 'react-native';
import styles from '../../components/Styles/shared';
import Form from '../../components/Form';
import {
  Button,
  List,
  ListItem,
  FormLabel,
  FormInput,
  CheckBox,
  // Card, SocialIcon, ListView, PricingCard
} from 'react-native-elements';
import LoginSettings from '../../../content/config/login.json';
import AppSettings from '../../../content/config/settings.json';

// http://browniefed.com/blog/react-native-layout-examples/
// https://medium.com/the-react-native-log/understanding-react-native-flexbox-layout-7a528200afd4#.noes46i4m
// https://css-tricks.com/snippets/css/a-guide-to-flexbox/

var loginStyles = StyleSheet.create(Object.assign({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    // paddingTop: 20,
  },
  halfHeight: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  quarterHeight: {
    flex: 1,
  },
  appNameBackground: {
    backgroundColor:'steelblue',
  },
  formBackground: {
    backgroundColor:'aliceblue',
  },
  formGroup: {
    flex:1,
  },
}, LoginSettings.login_extension.styles));


class Login extends Component {
  constructor(){
    super(...arguments);
  }
  render() {
    // console.log('LOGIN this.props',this.props);
    return (
      <View style={[loginStyles.container, { flexDirection: 'column', justifyContent: 'center', }]}>
        <View style={[ loginStyles.halfHeight, loginStyles.appNameBackground, ]}>
          <Image source={require('../../../content/theme/images/icons/logo.png')} style={LoginSettings.login_extension.logo_dimensions}/>  
          <Text>{AppSettings.name}</Text>
        </View>
        <View style={[ loginStyles.halfHeight, loginStyles.formBackground, { alignItems: 'center', justifyContent: 'center', }]}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width:400, }}>
            <Form error={this.props.user.error}
            submitFunction={this.props.loginUser}
            formElements={[
              <FormLabel>Email / Username</FormLabel>,
              <FormInput name="username" placeholder="Please enter your username or email" selectTextOnFocus={true} autoCapitalize="none" formTextChange={true} returnKeyType="next" />,
              <FormLabel>Password</FormLabel>,
              <FormInput name="password" placeholder="Please enter your Password" secureTextEntry={true}  formTextChange={true} returnKeyType="next"/>,
              // <Switch
              //   // onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              //   formSwitchChange="true"
              //   name="rememberme"
              //   // style={{marginBottom: 10}}
              //   value={false}
              //   />,
              <Button title="Login" submitOnPress="true" />,
            ]}/>  
          </View>  
          
        </View>
      </View>
    );
  }
}

export default Login;