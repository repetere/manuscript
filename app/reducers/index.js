import { combineReducers, } from 'redux';
import pageReducer from './pages';
import fetchDataReducer from './fetchData';
import clientCacheDataReducer from './pages';
import userReducer from './user';
import tabBarExtensionReducer from './tabBarExtensions';
import { routerReducer, } from 'react-router-redux';

const NativeCMSReducer = combineReducers({
  page: pageReducer,
  tabBarExtensions: tabBarExtensionReducer,
  routing: routerReducer,
  fetchData: fetchDataReducer,
  clientCacheData: clientCacheDataReducer,
  user: userReducer,
});

export default NativeCMSReducer;