import constants from '../constants';
import customSettings from '../../content/config/settings.json';
import runtimeSettings from '../../content/config/runtime.json';
// import Immutable from 'immutable';

const initialState = {
  location: (customSettings.defaultExtensionRoute)? customSettings.defaultExtensionRoute : '/',
  initial_app_state_loaded: false,
  layout: {},
  layoutRenderDate: null,
  runtime: runtimeSettings,
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
  case constants.pages.LOAD_PAGE_ACTION:
    var location = action.payload.location;
    return Object.assign(state, { location, });
  case constants.pages.UPDATE_APP_DIMENSIONS:
    var layout = action.payload.layout;
    return Object.assign(state, { layout, layoutRenderDate:new Date()});
  case constants.pages.INITIAL_APP_LOADED:
    return {
      location: action.payload.location || customSettings.defaultExtensionRoute || state.location,
      initial_app_state_loaded: true,
      runtime: runtimeSettings,
    };
  case constants.pages.RESET_APP_LOADED:
    return {
      location: state.location,
      initial_app_state_loaded: false,
      runtime: runtimeSettings,
    };
  default:
    return state;
  }
};

export default pageReducer;