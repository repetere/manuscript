import AppConfigExtensions from './extensions.json';
import CustomExtensions from '../../content/config/extensions.json';
import constants from '../constants';
const EXTENSIONS = Object.assign(AppConfigExtensions, CustomExtensions);
// import Immutable from 'immutable';

const getIntialTabs = () =>{
  let tabs = EXTENSIONS.standard.concat();//.splice(3, 0, EXTENSIONS.more);
  tabs.splice(4, 0, EXTENSIONS.more).slice(0, 4);
  return tabs.slice(0, 5);
};

const initialState = getIntialTabs();
// console.log('tabExtensions initialState',initialState)

const tabBarExtensionsReducer = (state = initialState, action) => {
  switch (action.type) {
  case constants.tabBarExtensions.SET_EXTENSIONS_ACTION:
    var arrayOfTabExtensions = action.payload.arrayOfTabExtensions;
    return Object.assign(state, arrayOfTabExtensions).slice(0, 5);
  default:
    return state;
  }
};

export default tabBarExtensionsReducer;