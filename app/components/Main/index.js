/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component, PropTypes, } from 'react';
import { View, Platform, AsyncStorage, Navigator, } from 'react-native';
import { Router, Route, /*browserHistory, hashHistory, createMemoryHistory,*/ } from 'react-router';
import Icon from 'react-native-vector-icons/Ionicons';
import Tabs from 'react-native-tabs';
import { createStore, } from 'redux';
import { Provider, connect, } from 'react-redux';
import capitalize from 'capitalize';
// import AppConfigExtensions from '../../../content/config/extensions.json';
import AppConfigSettings from '../../../content/config/settings.json';
import AppLoginSettings from '../../../content/config/login.json';
import { AppExtensions, AppRoutes, } from './extensions';
import styles from '../Styles/shared';
import TabIcon from '../AppTabs/TabIcon';
import LoadingView from '../LoadingIndicator/LoadingView';
import combinedReducers from '../../reducers';
import store from '../../stores';
import actions from '../../actions';
import constants from '../../constants';
import { historySettings, getHistory, } from '../../routers/history';
import { getComponentFromRouterLocation, getTabFromLocation, getRouteExtensionFromLocation, } from '../../util/location';
import pathToRegexp from 'path-to-regexp';
import { Area, AreaList, scene, Side, SceneStatus, } from 'scene-router';

const history = getHistory(historySettings, AppConfigSettings, store);
// const LoadingIndicators = (Platform.OS === 'web') ? ActivityIndicatorIOS : ActivityIndicator;
const defaultExtensionRoute = AppConfigSettings.defaultExtensionRoute || '/';

class MainApp extends Component{
  constructor(props) {
    super(props);
    this.state = {};
    this.previousRoute = {};
  }
  componentWillMount() {
    // console.log('componentWillMount this.props',this.props)
    /**
     *THIS IS FOR LANDING ON A DIFFERENT PAGE
    */
    let pageLocation = this.props.location.pathname;
    if (pageLocation !== defaultExtensionRoute) {
      this.props.onChangePage(pageLocation);
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps);
    /**
     *THIS WILL HANDLE BROWSER NAVIGATION
    */
    // let incomingAppFromLocation = getTabFromLocation(AppExtensions, getComponentFromRouterLocation(nextProps.location.pathname));
    // if (incomingAppFromLocation !== this.props.page.location) {
    //   this.props.onChangePage(incomingAppFromLocation);
    // }
    // this.loadExtensionRoute(nextProps.location.pathname);
  }
  componentDidMount() {
    // console.log('componentDidMount this.props', this.props);
    Promise.all([
      AsyncStorage.getItem(constants.jwt_token.TOKEN_NAME),
      AsyncStorage.getItem(constants.jwt_token.TOKEN_DATA),
      AsyncStorage.getItem(constants.jwt_token.PROFILE_JSON),
    ])
      .then((results) => {
        let jwt_token = results[ 0 ];
        let jwt_token_data = JSON.parse(results[ 1 ]);
        let jwt_user_profile = JSON.parse(results[ 2 ]);
        if (jwt_token_data && jwt_user_profile) {
          let url = AppLoginSettings.login.url;
          let response = {};
          let json = {
            token: jwt_token_data.token,
            expires: jwt_token_data.expires,
            timeout: jwt_token_data.timeout,
            user: jwt_user_profile,
          };
          this.props.saveUserProfile(url, response, json);
        } else if(jwt_token) {
          this.props.getUserProfile(jwt_token);
        }
        else {
          console.log('MAIN componentDidMount USER IS NOT LOGGED IN');
        }
        // this.setState({
        //   jwt_token,
        // });        
        this.props.initialAppLoaded();
      })
      .catch((error) => {
        console.log('MAIN componentDidMount: JWT USER Login Error.', error);
        this.props.logoutUser();
      });
  }
  onChangeScene(el, options) {
    this.onChangeExtension(el.props.path, options);
  }
  onChangeExtension(path, options) {
    let pageLocation = this.props.location.pathname;
    if (pageLocation !== defaultExtensionRoute) {
      this.previousRoute = { path:pageLocation, };
    }
    if (AppConfigSettings.routerHistory === 'createMemoryHistory') {
      this.props.onChangePage(path);
    } else {
      this.context.router.push(path);
    }
    this.loadExtensionRoute(path, options);
  }
  loadExtensionRoute(path, options = {}) {
    // console.log('loadExtensionRoute ', { path }, { options }, this.previousRoute, this.refs.AppNavigator);

    // window.appnav = this.refs.AppNavigator;
    
    /*
    if (options && options.config && options.config.action === 'goToPreviousExtension') {
      console.log('ABOUT TO GO BACK');
      this.refs.AppNavigator.goback();
    } else */
    if (!this.props.location || this.props.location.pathname !== path || (this.refs && this.refs.AppNavigator && this.refs.AppNavigator.state.paths.length === 0)) {
        
      let location = path || '/home';//'/stats/items/3423242';
      let matchedRoute = false;
      Object.keys(AppRoutes).every((route) => {
        if (matchedRoute!==false){
          return false;
        } else {
          let pathKeys = [];
          let pathRegex = pathToRegexp(route, pathKeys);
          if (pathRegex.test(location)){
            matchedRoute = {
              matchedRouteLocation: location,
              matchedRoutePathRegex: pathRegex,
              matchedRouteParams:pathKeys,
            };
          }
          return true;
        }
      });
      let navigationRoute = matchedRoute.matchedRouteLocation || defaultExtensionRoute;
      let passProps = options.passProps;
      let navigatorOptions = {
        side: Side.R,
        animate: false,
        clearHistory: true,
        reset: true,
      };
      let backNavigatorOptions = {
        side: Side.L,
        animate: false,
        clearHistory: true,
        reset: true,
      };

      if (options.config) {
        if (options.config.transitionDirection) {
          switch (options.config.transitionDirection) {
          case 'right':
            navigatorOptions.side = Side.R;
            navigatorOptions.animate = true;
            backNavigatorOptions.side = Side.L;
            backNavigatorOptions.animate = true;
            break;
          case 'left':
            navigatorOptions.side = Side.L;
            navigatorOptions.animate = true;
            backNavigatorOptions.side = Side.R;
            backNavigatorOptions.animate = true;
            break;
          case 'top':
            navigatorOptions.side = Side.T;
            navigatorOptions.animate = true;
            backNavigatorOptions.side = Side.B;
            backNavigatorOptions.animate = true;
            break;
          case 'bottom':
            navigatorOptions.side = Side.B;
            navigatorOptions.animate = true;
            backNavigatorOptions.side = Side.T;
            backNavigatorOptions.animate = true;
            break;
          default:
            break;
          }
        }

        
      }      

      if (this.refs.AppNavigator) {
        this.refs.AppNavigator.goto(navigationRoute, {
          props: Object.assign({},
            this.props,
            passProps,
            {
              onChangeExtension: this.onChangeExtension.bind(this),
              loadExtensionRoute: this.loadExtensionRoute.bind(this),
              goToPreviousExtension: this.onChangeExtension.bind(this, path, Object.assign({},
                options, {
                  config: Object.assign(backNavigatorOptions, {
                    action:'goToPreviousExtension',
                  }),
                }
              )),
              previousPath: path,
              previousOptions: options,
            }),
          opts: navigatorOptions,
        });
      }
    } else {
      // console.log('skipping componet update');
    }
  }
  componentWillUpdate (nextProps, nextState){
    // console.log('COMPONENT WILL UPDATE', { nextProps }, { nextState })
    this.loadExtensionRoute(nextProps.location.pathname);
    // perform any preparations for an upcoming update
  }
  render() {
    console.log('RENDER getRouteExtensionFromLocation(this.props.location.pathname)', getRouteExtensionFromLocation(this.props.location.pathname), 'this.props.location.pathname', this.props.location.pathname);
    let displayContent = (
      <View style={[styles.container,]}>
        {/*<CurrentApp {...this.props}  />*/}
        <View style={styles.stretchContainer}>
          <Area
            ref="AppNavigator"
            style={styles.stretchBox}
            onLoad={this.loadExtensionRoute.bind(this, (this.props.location)?this.props.location.pathname:'/')}
            >
            <LoadingView/>
          </Area>
        </View>
        <Tabs 
          style={styles.tabBar}>
            {this.props.tabBarExtensions.map((ext)=>{
              return (<TabIcon 
                {...ext}  
                key={ext.name} 
                ext={ext}  
                location={this.props.location}
                location_path={getRouteExtensionFromLocation(this.props.location.pathname)}
                selected={getRouteExtensionFromLocation(this.props.location.pathname)===ext.path}
                // changePage={this.onChangeScene.bind(this)}
                onSelect={this.onChangeScene.bind(this)}
                />);
            })}
        </Tabs>
      </View>
    );
    let displayLogin = (
      <View style={[styles.container,]}>
        <AppExtensions.Login {...this.props}  />
      </View>
    );
    let displayLoading = (
      <LoadingView/>
    );
    // console.log('MAIN APP: this.props', this.props);
    if (this.props.page.initial_app_state_loaded === false) {
      // console.log('MAIN APP: this.props.page.initial_app_state_loaded', this.props.page.initial_app_state_loaded);
      return displayLoading;
    } else if (this.props.user.isLoggedIn) {
      // console.log('MAIN APP: this.props.user.isLoggedIn', this.props.user.isLoggedIn);
      return displayContent;
    } else {
      // console.log('MAIN APP: displayLogin');
      return displayLogin;      
    }
  }
}
MainApp.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    page: state.page,
    user: state.user,
    tabBarExtensions: state.tabBarExtensions,
    fetchData: state.fetchData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialAppLoaded:()=>store.dispatch(actions.pages.initialAppLoaded()),
    onChangePage:(location) => store.dispatch(actions.pages.changePage(location)),
    requestData: (url, options, responseFormatter) => store.dispatch(actions.fetchData.request(url, options, responseFormatter)),
    setLoginStatus: (loggedIn) => store.dispatch(actions.user.setLoginStatus(loggedIn)),
    getUserProfile: (jwt_token) => store.dispatch(actions.user.getUserProfile(jwt_token)),
    saveUserProfile: (url, response, json) => store.dispatch(actions.user.saveUserProfile(url, response, json)),
    loginUser: (formdata) => store.dispatch(actions.user.loginUser(formdata)),
    logoutUser: () => store.dispatch(actions.user.logoutUser()),
  };
};

const MainAppContainer = connect(mapStateToProps, mapDispatchToProps)(MainApp);


class Main extends Component{
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="*" component={MainAppContainer} />
        </Router>
      </Provider>
    );
  }
}

export default Main;