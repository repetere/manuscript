import constants from '../constants';
// import Immutable from 'immutable';

const messageBar = {
  // /**
  //  * @param {string} location name of extension to load
  //  */
  // changePage(location) {
  //   return (dispatch, getState) => {
  //     if (getState().page.location !== location) {
  //       if (location !== 'login') {
  //         AsyncStorage.setItem(constants.messageBar.ASYNCSTORAGE_KEY, location);
  //       }
  //       dispatch(this.setPage(location));
  //     }
  //   };
  // },
  // setPage(location) {
  //   return {
  //     type: constants.messageBar.LOAD_PAGE_ACTION,
  //     payload: { location, },
  //   };
  // },
  showError(notification) {
    return {
      type: constants.messageBar.SHOW_ERROR,
      payload: { notification, },
    };
  },
  showInfo(notification) {
    return {
      type: constants.messageBar.SHOW_INFO,
      payload: { notification, },
    };
  },
};

export default messageBar;