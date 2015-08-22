(function(){
	'use strict';

	angular
	.module('app')
	.factory('$u', Utils);

	function Utils(
		$ionicLoading,
		$cordovaSocialSharing,
		$localstorage,
		$rootScope,
		$cordovaEmailComposer,
		$cordovaAppRate,
		$cordovaInAppBrowser,
		$location,
		$ionicHistory
	){
		var service = {
			showL: showL,
			hideL: hideL,
			share: share,
			isOnline: isOnline,
			stateOnlineChanged: stateOnlineChanged,
			sendMail: sendMail,
			rateApp: rateApp,
			appBrowser: appBrowser,
			redirect: redirect
		};

		return service;

		function redirect(path){
			$ionicHistory.clearHistory();
			$ionicHistory.clearCache();
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$location.path(path);
		}

		function showL(_c) {
			var color = _c || 'positive'
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-'+color+'"></ion-spinner>'
			});
		}

		function hideL(){
			$ionicLoading.hide();
		}

		function share(_url){
			var url = _url || URL;
			$cordovaSocialSharing.share('', '', null, url) // Share via native share sheet
			.then(function(result) {
				console.log(result);
			});
		}

		function stateOnlineChanged(){
			var newval = isOnline();
			$rootScope.online = newval;
			$rootScope.$broadcast('onlineUpdate', newval);
		}

		function isOnline(){
			var value = $localstorage.get('online');
			var v = JSON.parse(value);
			return v;
		}

		function sendMail(mail){
			var email = mail || {
				to: '',
				cc: '',
				bcc: [],
				attachments: [
					//'file://img/logo.png',
					//'res://icon.png',
					//'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
					//'file://README.pdf'
				],
				subject: 'Check out this great Ionic app',
				body: 'The backbone of you ionic mobile app',
				isHtml: true
			};

			$cordovaEmailComposer.isAvailable().then(function() {
				// is available
				$cordovaEmailComposer.open(email).then(null, function () {
				// user cancelled email
				});

			}, function() {
				// not available
				alert('Sorry, email not avaiable');
			});

		}

		function rateApp(){
			$cordovaAppRate.promptForRating(true).then(function (result) {
				console.log(result);
			});
		}

		function appBrowser(_url){
			var url = _url || URL;

			$cordovaInAppBrowser.open(url, '_self', {toolbar: 'yes'})
			.then(function(event) {
				// success
				console.log(event);
			})
			.catch(function(event) {
				// error
				console.log(event);
			});
		}
	}
})();
