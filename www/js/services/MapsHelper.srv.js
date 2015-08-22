(function(){
	'use strict';

	angular
	.module('app')
	.factory('MapsHelper', Maps);

	function Maps($cordovaGeolocation, $ionicActionSheet, $http){
		var service = {
			findAddress: findAddress,
			centerHere: centerHere,
			cordsToAddress: cordsToAddress,
			askForGps: askForGps,
			getAddressStaticImage: getAddressStaticImage
		};

		return service;

		function findAddress(address, _language){
			var language = _language || 'en';
			var url = [
				'http://maps.google.com/maps/api/geocode/json?address=',
				encodeURIComponent(address),
				'&sensor=true&language=',
				language,
				'&region',
				language
			].join('');
			return $http.get(url);
		}

		function getAddressStaticImage(address, point, _size){
			var size = _size || '500x300';
			return 'https://maps.googleapis.com/maps/api/staticmap?center='+encodeURIComponent(address)+'&zoom=18&size='+size+'&maptype=roadmap&markers=color:red%7C'+point.latitude+','+point.longitude;
		}

		function cordsToAddress(lat, lon){
			var url = [
				'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
				lat +','+ lon	
			].join('');
			return $http.get(url);
		}

		function centerHere(options){
			var posOptions = options || {timeout: 10000, enableHighAccuracy: true};
			return $cordovaGeolocation
			.getCurrentPosition(posOptions);
		}

		function askForGps(){
			// Show the action sheet
			var sheet = $ionicActionSheet.show({
				buttons: [
					{ text: '<b>Enable GPS</b>' },
				],
				titleText: 'Please enable location',
				cancelText: '<span class="assertive">Cancel',
				buttonClicked: function(index) {
					if(!ionic.Platform.isIOS()) cordova.plugins.diagnostic.switchToLocationSettings();
					sheet();
				}
			});
		}
	}
})();
