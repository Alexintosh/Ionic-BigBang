(function(){
	'use strict';

	angular
	.module('app')
	.controller('AppCtrl', AppCtrl);

	function AppCtrl($scope, $localstorage, $ionicHistory, $rootScope, $u, $settings, contactMail) {

		$scope.credentials = $localstorage.getObject('credentials');

		//$rootScope.settings = $settings.fetch();
		$scope.clear = clear;
		$scope.contactUs = contactUs;

		$scope.$on('settingsChanged', function() {
			$rootScope.settings = $settings.fetch();
		});

		function contactUs(){
			$u.sendMail({
				to: contactMail,
				subject: 'Informations'
			});
		}

		function clear(){
			$ionicHistory.clearHistory();
			$ionicHistory.clearCache();
		}
	}
})();
