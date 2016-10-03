import { combineReducers, } from 'redux';
// import Apps from '../../extensions/Apps';
import { routerReducer, } from 'react-router-redux'

const NativeCMSReducer = combineReducers({
  // ...reducers,
  routing: routerReducer,
});

export default NativeCMSReducer;