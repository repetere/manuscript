/**
 * Name: Message Bar Manager
 * Description: A manager to show/hide and handle a queue of alerts
 * https://github.com/KBLNY/react-native-message-bar
 */

export default {
	_currentMessageBarAlert: null,
	_messageAlerts: new Array(),

	setCurrentMessageBarAlert:function(alert) {
		console.warn("This method is deprecated, please use registerMessageBar instead.");
		this.registerMessageBar(alert);
	},

	removeCurrentMessageBarAlert:function() {
		console.warn("This method is deprecated, please use registerMessageBar instead.");
		this.unregisterMessageBar();
	},

  registerMessageBar: function (messageBar) {
		this._currentMessageBarAlert = messageBar;
	},

	unregisterMessageBar:function() {
		this._currentMessageBarAlert = null;
	},

  getRegisteredMessageBar: function () {
    return this._currentMessageBarAlert;
  },  

	showCurrentAlert:function(newState = null) {
		console.warn("This method is deprecated, please use showAlert instead.");
		this.showAlert(newState);
	},

	showAlert:function(newState = null) {
		if (this._currentMessageBarAlert === null) {
			return;
		}

		// Hide the current alert
		this.hideAlert();

		// Get the current alert's duration to hide
		var durationToHide = this._currentMessageBarAlert.state.durationToHide;

		setTimeout(() => {
			// Show the new alert if there is a new state, otherwise
			if (newState != null) {
				// Clear current state
				this._currentMessageBarAlert.setNewState({});

				this._currentMessageBarAlert.setNewState(newState);

				this._currentMessageBarAlert.notifyAlertHiddenCallback = null;

				setTimeout(() => {
					this._currentMessageBarAlert.showMessageBarAlert();
				}, 100);
			}
		}, durationToHide);
	},


	hideAlert:function() {
    if (this._currentMessageBarAlert && this._currentMessageBarAlert !== null) {
			this._currentMessageBarAlert.hideMessageBarAlert();
		}
	},

};
