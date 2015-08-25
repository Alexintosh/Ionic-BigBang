(function(){
	'use strict';

	angular
	.module('app')
	.factory('$notification', Notification);

	function Notification($cordovaPush, $ionicPopup, $log, Utils, Settings){
		var service = {
			handle: handleNotification,
			registerDevice: register
		};

		return service;

		function register(){
			if( ionic.Platform.isWebView() && Settings.fetch().notification.enabled ){
				$cordovaPush.register(androidConfig).then(function(result) {
					console.log('REGISTER PUSH');
					console.log(result);
				}, function(err) {
					// Error
					console.log('REGISTER PUSH ERROR');
					console.log(err)
				});
			}
		}

		function showPopup(notification){
			var alertPopup = $ionicPopup.show({
				template: notification.message,
				title: 'Push notification',
			buttons: [
				{ text: 'Cancel' },
				{
					text: 'Read it',
					type: 'button-positive',
					onTap: function(e) {
						Utils.redirect('/app/alert/'+notification.payload.custom.notification.id);
					}
				}
			]
			});
		}

		function handleNotification(event, notification){
			switch(notification.event) {
				case 'registered':
					if (notification.regid.length > 0 ) {
						//Do something
					}
				break;

				case 'message':
					if( !notification.foreground ) Utils.redirect('/app/alert/'+notification.payload.custom.id);
					else showPopup(notification);
				break;

				case 'error':
					alert('GCM error = ' + notification.msg);
				break;

				default:
					alert('An unknown GCM event has occurred');
				break;
			}
		}

	}
})();
