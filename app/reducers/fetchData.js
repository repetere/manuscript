import constants from '../constants';
// import Immutable from 'immutable';

const initialState = {
  isFetching:false,
  didInvalidate: false,
  updatedAt: null,
  timestamp: null,
  url: null,
  response: null,
  responseFormatter: null,
  json: null,
  error: false,
  fetchedDataPageCount: 0,
  fetchedDataNextPageUrl: null,
};

const fetchDataReducer = (state, action) => {
  switch (action.type) {
  case constants.fetchData.FETCH_DATA_REQUEST:
    var requestPayload = action.payload;
    return Object.assign(state, {
      isFetching: true,
      url: requestPayload.url,
      options: requestPayload.options,
    });
  case constants.fetchData.FETCH_DATA_SUCCESS:
    var successPayload = action.payload;
    return Object.assign({
      isFetching: false,
      url: successPayload.url,
      error: false,
      response: successPayload.response,
      json: successPayload.json,
      updatedAt: successPayload.updatedAt,
    });
  case constants.fetchData.FETCH_DATA_FAILURE:
    var failurePayload = action.payload;
    return Object.assign(state, {
      isFetching: false,
      url: failurePayload.url,
      error: failurePayload.error,
      updatedAt: failurePayload.updatedAt,
    });
  default:
    return Object.assign(initialState, state);
  }
};

export default fetchDataReducer;