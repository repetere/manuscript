
export default {
  pipelines: {
    all: {
      BASE_URL: 'https://localhost:8885/api/data/v2/',
    },
    items: {
      GET_INDEX:'items?format=json',
      POST_UPDATE:'items/',
    },
  },
};
