
export default {
  pipelines: {
    all: {
      BASE_URL: 'https://pas-dev.promisefinancial.net:8885/pas/data/v2/',
    },
    engines: {
      GET_INDEX:'engines?format=json',
    },
    resources: {
      GET_INDEX:'resources?format=json',
    },
    parsers: {
      GET_INDEX:'parsers?format=json',
    },
    segments: {
      GET_INDEX:'segments?format=json',
    },
    customers: {
      GET_INDEX:'customers?format=json',
    },
    applications: {
      GET_INDEX:'applications?format=json',
    },
    items: {
      GET_INDEX:'items?format=json',
      POST_UPDATE:'items/',
    },
  },
};
