/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component, PropTypes, } from 'react';
import { View, Platform, AsyncStorage, Navigator, Text, } from 'react-native';
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
import { onLayoutUpdate, setLayoutHandler } from '../../util/dimension';
import pathToRegexp from 'path-to-regexp';
import { Area, AreaList, scene, Side, SceneStatus, } from 'scene-router';
import { MessageBarManager, MessageBar, } from '../MessageBar';
import moment from 'moment';
import debounce from 'debounce';
const history = getHistory(historySettings, AppConfigSettings, store);
// const LoadingIndicators = (Platform.OS === 'web') ? ActivityIndicatorIOS : ActivityIndicator;
const defaultExtensionRoute = AppConfigSettings.defaultExtensionRoute || '/';
let initialRouteChange = false;

class MainApp extends Component{
  constructor(props) {
    super(props);
    this.state = props;
    this.previousRoute = {};
  }
  componentWillMount() {
    // console.log('componentWillMount this.props',this.props)
    /**
     *THIS IS FOR LANDING ON A DIFFERENT PAGE
    */
    let pageLocation = this.props.location.pathname;
    if (pageLocation !== defaultExtensionRoute) {
      this.props.onChangePage(pageLocation,{config:{onAppStart:true,}});
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log('MAIN componentWillReceiveProps', { nextProps, });
    if (nextProps.user.isLoggedIn !== true && (this.getCurrentScenePath() !== '/login' || this.state.location.pathname !== '/login')) {
      this.onChangeExtension.call(this, '/login', {
        initialLoad: 'recievedPropLogin',
        loginStatus: this.state.user.isLoggedIn,
        config: {
          transitionDirection:'top',
        },
      });
    } else if (nextProps.user.isLoggedIn === true && this.getCurrentScenePath() === '/login' && this.getCurrentScenePath() !== defaultExtensionRoute && nextProps.location.pathname !== defaultExtensionRoute) {
      this.onChangeExtension(defaultExtensionRoute, {
        initialLoad: 'recievedPropLogin',
        loginStatus: this.state.user.isLoggedIn,
        config: {
          transitionDirection:'bottom',
        },
      });
    }
    else if (initialRouteChange===false && Platform.OS ==='web' && nextProps.user.isLoggedIn === true && this.getCurrentScenePath() !== nextProps.location.pathname) {
      // console.log('HANDLE BROWSER NAV')
      initialRouteChange = true;
      this.onChangeExtension(nextProps.location.pathname, {
        initialLoad: 'recievedPropLogin',
        loginStatus: this.state.user.isLoggedIn,
        config: {
          transitionDirection:'bottom',
        },
      });
    }
    else if (Platform.OS !=='web' && initialRouteChange===false && nextProps.user.isLoggedIn === true && nextProps.page.initial_app_state_loaded === true){
      initialRouteChange = true;
      // console.log('CHANGE INITAL ROUTE, current route',this.getCurrentScenePath())
      this.onChangeExtension(defaultExtensionRoute, {
        initialLoad: 'recievedPropLogin',
        loginStatus: this.state.user.isLoggedIn,
        config: {
          transitionDirection:'bottom',
        },
      });
    }
    else {
      // console.log('NOT DEALING WITH LOGIN')
    }
    // 
    this.setState(nextProps);
    // console.log('COMPONENT WILL RECIEVE PROPS');

    // console.log('componentWillReceiveProps nextProps', nextProps);
    /**
     *THIS WILL HANDLE BROWSER NAVIGATION
    */
    // let incomingAppFromLocation = getTabFromLocation(AppExtensions, getComponentFromRouterLocation(nextProps.location.pathname));
    // if (incomingAppFromLocation !== this.props.page.location) {
    //   this.props.onChangePage(incomingAppFromLocation);
    // }
    // this.loadExtensionRoute(nextProps.location.pathname);
    // if (this.refs.AlertNotification) {
    //   if (!MessageBarManager.getRegisteredMessageBar()) {
    //     MessageBarManager.registerMessageBar(this.refs.AlertNotification);
    //   }
    //   MessageBarManager.showAlert(nextProps.messageBar);
    // }   
  }
  componentDidMount() {
    setLayoutHandler.call(this);
    // console.log('componentDidMount this.props', this.props);
    Promise.all([
      AsyncStorage.getItem(constants.jwt_token.TOKEN_NAME),
      AsyncStorage.getItem(constants.jwt_token.TOKEN_DATA),
      AsyncStorage.getItem(constants.jwt_token.PROFILE_JSON),
      AsyncStorage.getItem(constants.async_token.TABBAR_TOKEN),
    ])
      .then((results) => {
        let jwt_token = results[ 0 ];
        let jwt_token_data = JSON.parse(results[ 1 ]);
        let jwt_user_profile = JSON.parse(results[ 2 ]);
        let appTabs = (results[ 3 ]) ? JSON.parse(results[ 3 ]) : false;
        // console.log('main apptabs',{ appTabs });
        if (jwt_token_data && jwt_user_profile) {
          let url = AppLoginSettings[this.props.page.runtime.environment].login.url;
          let response = {};
          let json = {
            token: jwt_token_data.token,
            expires: jwt_token_data.expires,
            timeout: jwt_token_data.timeout,
            user: jwt_user_profile,
          };
          let currentTime = new Date();
          
          if (moment(jwt_token_data.expires).isBefore(currentTime)) {
            let expiredTokenError = new Error(`Access Token Expired ${moment(jwt_token_data.expires).format('LLLL')}`);
            setTimeout(() => {
              this.handleErrorNotification({ message: 'Access Token Expired' + expiredTokenError, }, expiredTokenError);
            }, 1000);
            throw expiredTokenError;
          } else {
            this.props.saveUserProfile(url, response, json);
            if (appTabs) {
              this.props.setTabExtensions(appTabs);
            }
          }
        } else if (jwt_token) {
          this.props.getUserProfile(jwt_token);
        }
        else {
          console.log('MAIN componentDidMount USER IS NOT LOGGED IN');
        }      
        this.props.initialAppLoaded();
      })
      .catch((error) => {
        console.log('MAIN componentDidMount: JWT USER Login Error.', error);
        this.props.logoutUser();
      });
    setImmediate(() => {
      // MessageBarManager.hideAlert();
      MessageBarManager.registerMessageBar(this.refs.AlertNotification);
      // MessageBarManager.hideAlert();
    });
  }
  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
    setImmediate(() => {
      MessageBarManager.hideAlert();
      MessageBarManager.unregisterMessageBar();
    });
  }
  onChangeScene(el, options) {
    this.onChangeExtension(el.props.path, options);
  }
  onChangeExtension(path, options = {}) {
    // console.log('onChangeExtension',{path},{options})
    let pageLocation = this.props.location.pathname;
    if (pageLocation !== defaultExtensionRoute) {
      this.previousRoute = { path:pageLocation, };
    }
    if (AppConfigSettings.routerHistory === 'createMemoryHistory') {
      this.props.onChangePage(path);
    } else {
      this.context.router.push(path);
    }
    if(!options.skipSceneChange){
      this.loadExtensionRoute(path, options);
    }
  }
  getCurrentScenePath() {
    if (this.refs && this.refs.AppNavigator) {
      return this.refs.AppNavigator.state.paths.slice(-1)[ 0 ];
    } else{
      return null;
    }
  }
  handleErrorNotification(options, error) {
    console.log({ error, });
    let notificationProps = Object.assign({
      messageStyle:{margin:5, color:'white'},
      titleStyle:{margin:5,},
      // title: 'Error creating Engine',
      alertType: 'error',
    }, options);
    MessageBarManager.showAlert(notificationProps);
  }
  loadExtensionRoute(path, options = {}) {
    // console.log('loadExtensionRoute ',
    //   { path, },
    //   { options, } //,
    //   // 'this.props.location', this.props.location,
    //   // 'this.refs.AppNavigator', this.refs.AppNavigator,
    // );
    // console.log('this.props', this.props);
    // console.log('this.getCurrentScenePath()', this.getCurrentScenePath());
    // window.appnav = this.refs.AppNavigator;
    if (!MessageBarManager.getRegisteredMessageBar()) {
      MessageBarManager.registerMessageBar(this.refs.AlertNotification);
      // MessageBarManager.hideAlert();
      window.MessageBarManager = MessageBarManager;
    }
    /*
    if (options && options.config && options.config.action === 'goToPreviousExtension') {
      console.log('ABOUT TO GO BACK');
      this.refs.AppNavigator.goback();
    } else */
    if ( path!==this.getCurrentScenePath()  && (!this.state.location || this.state.location.pathname !== path) || (this.refs && this.refs.AppNavigator && this.refs.AppNavigator.state.paths.length === 0)) {
        
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

      if (this.refs.AppNavigator && navigationRoute !== this.getCurrentScenePath()) {
        // console.log('CHANGE NEW SCENE from',this.getCurrentScenePath(), {path}, { navigationRoute }, { navigatorOptions });
        this.refs.AppNavigator.goto(navigationRoute, {
          props: Object.assign({},
            this.state,
            passProps,
            {
              onChangeExtension: this.onChangeExtension.bind(this),
              loadExtensionRoute: this.loadExtensionRoute.bind(this),
              handleErrorNotification: this.handleErrorNotification.bind(this),
              MessageBarManager,
            }),
          opts: navigatorOptions,
        });
      } else {
        console.log('SKIPPIPNG APP NAVIGATOR, ALREADY ON SCENE PATH');
      }
      // // console.log('this.props.showInfo',this.props.showInfo)
      // // this.props.showInfo({ title: 'new page', message: 'time stamp ' + new Date(), });
      // if (this.refs.AlertNotification) {
      //   MessageBarManager.showAlert({title:'some titile', message: 'time stamp ' + new Date(), });
      // }  
    } else {
      console.log('skipping componet update', { path, }, 'this.getCurrentScenePath()', this.getCurrentScenePath());
    }
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log('COMPONENT WILL UPDATE');
    // console.log('COMPONENT WILL UPDATE',{refs:this.refs}, { nextProps }, { nextState })
    // this.loadExtensionRoute(nextProps.location.pathname);
    // perform any preparations for an upcoming update
  }
  render() {
    // console.log(
    //   'MAIN RENDER',
    // //   'RENDER getRouteExtensionFromLocation(this.props.location.pathname)',
    // //   getRouteExtensionFromLocation(this.props.location.pathname),
    // //   'this.props.location.pathname',
    // //   this.props.location.pathname,
    // //   // 'this.props', this.props //,
    //   'this.state', this.state//,
    // );

    // console.log('this.state.user.isLoggedIn', this.state.user.isLoggedIn);
    let initialPath = (this.state.location) ? this.state.location.pathname : '/';

    return (<View
      onLayout={onLayoutUpdate.bind(this)}
      style={[ styles.container, { backgroundColor: 'white' }]}
      >
      {/*<CurrentApp {...this.state}  />
      <Text style={{ backgroundColor:'darkgray', color:'white', padding:20, position:'absolute', top:20, left:20, zIndex:1000}}>{JSON.stringify(this.state.page.layout,null,2)}</Text>*/}
      <View style={styles.stretchContainer}>
        <Area
          ref="AppNavigator"
          style={styles.stretchBox}
          >
          <LoadingView/>
        </Area>
      </View>
      {(this.state.user.isLoggedIn===true)? (<Tabs
        style={styles.tabBar}>
        {this.state.tabBarExtensions.current.map((ext) => {
          return (<TabIcon
            {...ext}
            key={ext.name}
            ext={ext}
            location={this.state.location}
            location_path={getRouteExtensionFromLocation(this.state.location.pathname) }
            selected={getRouteExtensionFromLocation(this.state.location.pathname) === ext.path}
            // changePage={this.onChangeScene.bind(this)}
            onSelect={this.onChangeScene.bind(this) }
            />);
        }) }
      </Tabs>) : null}
      
      <MessageBar ref="AlertNotification" />
    </View>);
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
    messageBar: state.messageBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialAppLoaded:()=>store.dispatch(actions.pages.initialAppLoaded()),
    onChangePage:(location) => store.dispatch(actions.pages.changePage(location)),
    setAppDimensions:(layout) => store.dispatch(actions.pages.setAppDimensions(layout)),
    requestData: (url, options, responseFormatter) => store.dispatch(actions.fetchData.request(url, options, responseFormatter)),
    setTabExtensions: (arrayOfTabExtensions)=>store.dispatch(actions.tabBarExtension.setTabExtensions(arrayOfTabExtensions)),
    showError: (notification) => store.dispatch(actions.messageBar.showError(notification)),
    showInfo: (notification) => store.dispatch(actions.messageBar.showInfo(notification)),
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