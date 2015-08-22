(function(){
	'use strict';

	angular
	.module('app')
	.controller('SettingsCtrl', SettingsCtrl);

	function SettingsCtrl($scope, $settings) {
		$scope.set = $settings.fetch();
		$scope.save = save;

		$scope.$watchCollection('set', save);
		function save(){
			$settings.save($scope.set);
		}
	}
})();
