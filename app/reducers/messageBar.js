import constants from '../constants';

const initialState = {
// Default values, will be overridden
  backgroundColor: '#007bff', // default value : blue
  strokeColor: '#006acd', // default value : blue
  animationTypeTransform: 'SlideFromTop', // default value

  /* Cusomisation of the alert: Title, Message, Icon URL, Alert alertType (error, success, warning, info), Duration for Alert keep shown */
  title: 'props.title',
  message: 'props.message',
  avatar: 'props.avatar',
  alertType: 'info',
  duration: 3000,

  /* Hide setters */
  shouldHideAfterDelay: true,
  shouldHideOnTap: true,

  /* Callbacks method on Alert Tapped, on Alert Show, on Alert Hide */
  onTapped: null,
  onShow: null,
  onHide: null,

  /* Stylesheets */
  stylesheetInfo: { backgroundColor: '#007bff', strokeColor: '#006acd' }, // Default are blue colors
  stylesheetSuccess: { backgroundColor: 'darkgreen', strokeColor: '#b40000' }, // Default are Green colors
  stylesheetWarning: { backgroundColor: '#ff9c00', strokeColor: '#f29400' }, // Default are orange colors
  stylesheetError: { backgroundColor: '#ff3232', strokeColor: '#FF0000' }, // Default are red colors
  stylesheetExtra: { backgroundColor: '#007bff', strokeColor: '#006acd' }, // Default are blue colors, same as info

  /* Duration of the animation */
  durationToShow: 350,
  durationToHide: 350,

  /* Offset of the View, useful if you have a navigation bar or if you want the alert be shown below another component instead of the top of the screen */
  viewTopOffset: 0,
  viewBottomOffset: 0,
  viewLeftOffset: 0,
  viewRightOffset: 0,

  /* Inset of the view, useful if you want to apply a padding at your alert content */
  viewTopInset: 0,
  viewBottomInset: 0,
  viewLeftInset: 0,
  viewRightInset: 0,

  /* Number of Lines for Title and Message */
  titleNumberOfLines: 1,
  messageNumberOfLines: 2,

  /* Style for the text elements and the avatar */
  titleStyle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  messageStyle: { color: 'white', fontSize: 16 },
  avatarStyle: { height: 40, width: 40, borderRadius: 20 },

  /* Position of the alert and Animation Type the alert is shown */
  position: 'top',
  animationType: 'SlideFromTop',
};

const messageBarReducer = (state = initialState, action) => {
  switch (action.type) {
  case constants.messageBar.SHOW_INFO:
    var infoNotification = action.payload.notification;
    return Object.assign(state, { infoNotification, });
  case constants.messageBar.SHOW_ERROR:
    var errorNotification = action.payload.notification;
    return Object.assign(state, { errorNotification, });
  default:
    return state;
  }
};

export default messageBarReducer;