import { Platform, } from 'react-native';
if (Platform.OS === 'web') {
  require('whatwg-fetch');
  require('babel-polyfill');
}
// import Immutable from 'immutable';

let checkStatus = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};


let request = function (url, options, responseFormatter) {
  return new Promise((resolve, reject) => {
    try {
      fetch(url, options)
        .then(checkStatus)
        .then((response) => {
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
          resolve(responseData);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (e) {
      reject(e);
    }
  });
};

exports.checkStatus = checkStatus;
exports.request = request;
