import constants from '../constants';
import { Platform, } from 'react-native';
if (Platform.OS === 'web') {
  require('whatwg-fetch');
  require('babel-polyfill');
}
// import Immutable from 'immutable';

const checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const fetchData = {
  /**
   * @param {string} url restful resource
   */
  requestFetchData(url, options) {
    return {
      type: constants.fetchData.FETCH_DATA_REQUEST,
      payload: {
        url,
        options,
      },
    };
  },
  /**
   * @param {string} location name of extension to load
   * @param {object} options what-wg fetch options
   */
  recievedFetchData(url, response, json) {
    return {
      type: constants.fetchData.FETCH_DATA_SUCCESS,
      payload: {
        url,
        response,
        json,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  /**
  * @param {string} location name of extension to load
  */
  failedFetchData(url, error) {
    return {
      type: constants.fetchData.FETCH_DATA_FAILURE,
      payload: {
        url,
        error,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  /**
  * @param {string} url url for fetch request
  * @param {object} options what-wg fetch options
  * @param {function} responseFormatter custom reponse formatter, must be a function that returns a promise that resolves to json/javascript object
  */
  request(url, options, responseFormatter) {
    return (dispatch, getState) => {
      let fetchResponse;
      dispatch(this.requestFetchData(url, Object.assign({}, options)));
      try {
        fetch(url, options)
          .then(checkStatus)
          .then((response) => {
            fetchResponse = response;
            if (responseFormatter) {
              let formatterPromise = responseFormatter(response);
              if (formatterPromise instanceof Promise) {
                return formatterPromise;
              } else {
                throw new Error('responseFormatter must return a Promise');
              }
            } else {
              return response.json();
            }
          })
          .then((responseData) => {
            dispatch(this.recievedFetchData(url, fetchResponse, responseData));
          })
          .catch((error) => {
            dispatch(this.failedFetchData(url, error));
          });
      }
      catch (e) {
        dispatch(this.failedFetchData(url, e));
      }
    };
  },
};

export default fetchData;