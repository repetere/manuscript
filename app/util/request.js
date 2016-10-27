import { Platform, } from 'react-native';

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
    let fetchedRequest;
    try {
      fetch(url, options)
        // .then(checkStatus)
        .then((response) => {
          // console.log({ response, });
          fetchedRequest = response;
          if (responseFormatter) {
            let formatterPromise = responseFormatter(response);
            if (formatterPromise instanceof Promise) {
              return formatterPromise;
            } else {
              throw new Error('responseFormatter must return a Promise');
            }
          } else if  (fetchedRequest.status >= 200 && fetchedRequest.status < 300) {
            return response.json();
          } else {
            return {};
          }
        })
        .then((responseData) => {
          // console.log({ responseData, });
          if (fetchedRequest.status >= 200 && fetchedRequest.status < 300) { 
            resolve(responseData);
          } else {
            let errorResponse = fetchedRequest.statusText;
            if (responseData.data && typeof responseData.data.error === 'string') {
              errorResponse = responseData.data.error;
            } else if (responseData.data && typeof responseData.data === 'string') {
              errorResponse = responseData.data;
            }
            reject(errorResponse);            
          }
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
