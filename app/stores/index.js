import { createStore, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from '../reducers';
// import promise from 'redux-promise';
// import createLogger from 'redux-logger';
// const logger = createLogger();

const logger = (store) => (next) => (action) => {
  console.log('dispatching: ', action);
  return next(action);
};

const NativeCMSStore = createStore(
  combinedReducers,
  applyMiddleware(
    thunk,
    // promise,
    logger
  )
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept(combinedReducers, () => {
    const nextRootReducer = combinedReducers;
    NativeCMSStore.replaceReducer(nextRootReducer);
  });
}

export default NativeCMSStore;
